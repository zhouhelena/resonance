//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

 import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IUniswapV3Pool} from "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";

import {TickMath} from "./uniswap/TickMath.sol";
import {LiquidityAmounts} from "./uniswap/LiquidityAmounts.sol";
import {FullMath} from "./uniswap/FullMath.sol";
import {IRangeProtocolVault} from "./interfaces/IRangeProtocolVault.sol";
import {RangeProtocolVaultStorage} from "./RangeProtocolVaultStorage.sol";
import {VaultErrors} from "./errors/VaultErrors.sol";

/**
 * @dev Mars@RangeProtocol
 * @notice RangeProtocolVault is fungible vault shares contract that accepts uniswap pool tokens for liquidity
 * provision to the corresponding uniswap v3 pool. This contract is configurable to work with any uniswap v3
 * pool and is initialized through RangeProtocolFactory contract's createVault function which determines
 * the pool address based provided tokens addresses and fee tier.
 *
 * The contract allows minting and burning of vault shares where minting involves providing token0 and/or token1
 * for the current set ticks (or based on ratio of token0 and token1 amounts in the vault when vault does not have an
 * active position in the uniswap v3 pool) and burning involves removing liquidity from the uniswap v3 pool along with
 * the vault's fee.
 *
 * The manager of the contract can remove liquidity from uniswap v3 pool and deposit into a newer take range to maximise
 * the profit by keeping liquidity out of the pool under high volatility periods.
 *
 * Part of the fee earned from uniswap v3 position is paid to manager as performance fee and fee is charged on the LP's
 * notional amount as managing fee.
 */
contract RangeProtocolVault is
    ERC20,
    IRangeProtocolVault,
    RangeProtocolVaultStorage
{
    using TickMath for int24;

    /// Performance fee cannot be set more than 20% of the fee earned from uniswap v3 pool.
    uint16 private constant MAX_PERFORMANCE_FEE_BPS = 2000;
    /// Managing fee cannot be set more than 1% of the total fee earned.
    uint16 private constant MAX_MANAGING_FEE_BPS = 100;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
    }

    /**
     * @notice initialize initializes the vault contract and is called right after proxy deployment
     * by the factory contract.
     * @param _pool address of the uniswap v3 pool associated with vault
     * @param _tickSpacing tick spacing of the uniswap pool
     * to keep the initialize function implementation contract generic to be compatible with factory contract
     */
    function initialize(
        address _pool,
        int24 _tickSpacing,
        address manager
    ) external {
        // reverts if manager address provided is zero.
        if (manager == address(0x0)) revert VaultErrors.ZeroManagerAddress();

        pool = IUniswapV3Pool(_pool);

        token0 = IERC20(pool.token0());
        token1 = IERC20(pool.token1());
        tickSpacing = _tickSpacing;
        factory = msg.sender;

        // Managing fee is 0% and performanceFee is 10% at the time vault initialization.
        _updateFees(0, 1000);

        mintStarted = true;
        inThePosition = true;
        lowerTick = -887200;
        upperTick = 887200;
    }

    function setTicks(int24 _lowerTick, int24 _upperTick) external {
        lowerTick = _lowerTick;
        upperTick = _upperTick;
    }

    /**
     * @notice mint mints range vault shares, fractional shares of a Uniswap V3 position/strategy
     * to compute the amount of tokens necessary to mint `mintAmount` see getMintAmounts
     * @param mintAmount The number of shares to mint
     * @param maxAmountsIn max amounts to add in token0 and token1.
     * @return amount0 amount of token0 transferred from msg.sender to mint `mintAmount`
     * @return amount1 amount of token1 transferred from msg.sender to mint `mintAmount`
     */
    function mint(
        uint256 mintAmount,
        uint256[2] calldata maxAmountsIn
    ) external override returns (uint256 amount0, uint256 amount1) {
        if (!mintStarted) revert VaultErrors.MintNotStarted();
        if (mintAmount == 0) revert VaultErrors.InvalidMintAmount();
        uint256 totalSupply = totalSupply();
        bool _inThePosition = inThePosition;
        (uint160 sqrtRatioX96, , , , , , ) = pool.slot0();

        if (totalSupply > 0) {
            (uint256 amount0Current, uint256 amount1Current) = getUnderlyingBalances();
            amount0 = FullMath.mulDivRoundingUp(amount0Current, mintAmount, totalSupply);
            amount1 = FullMath.mulDivRoundingUp(amount1Current, mintAmount, totalSupply);
        } else if (_inThePosition) {
            // If total supply is zero then inThePosition must be set to accept token0 and token1 based on currently set ticks.
            // This branch will be executed for the first mint and as well as each time total supply is to be changed from zero to non-zero.
            (amount0, amount1) = LiquidityAmounts.getAmountsForLiquidity(
                sqrtRatioX96,
                lowerTick.getSqrtRatioAtTick(),
                upperTick.getSqrtRatioAtTick(),
                uint128(mintAmount)
            );
        } else {
            // If total supply is zero and the vault is not in the position then mint cannot be accepted based on the assumptions
            // that being out of the pool renders currently set ticks unusable and totalSupply being zero does not allow
            // calculating correct amounts of amount0 and amount1 to be accepted from the user.
            // This branch will be executed if all users remove their liquidity from the vault i.e. total supply is zero from non-zero and
            // the vault is out of the position i.e. no valid tick range to calculate the vault's mint shares.
            // Manager must call initialize function with valid tick ranges to enable the minting again.
            revert VaultErrors.MintNotAllowed();
        }

        if (amount0 > maxAmountsIn[0] || amount1 > maxAmountsIn[1])
            revert VaultErrors.SlippageExceedThreshold();

        if (!userVaults[msg.sender].exists) {
            userVaults[msg.sender].exists = true;
            users.push(msg.sender);
        }
        if (amount0 > 0) {
            userVaults[msg.sender].token0 += amount0;
            token0.transferFrom(msg.sender, address(this), amount0);
        }
        if (amount1 > 0) {
            userVaults[msg.sender].token1 += amount1;
            token1.transferFrom(msg.sender, address(this), amount1);
        }

        _mint(msg.sender, mintAmount);
        if (_inThePosition) {
            uint128 liquidityMinted = LiquidityAmounts.getLiquidityForAmounts(
                sqrtRatioX96,
                lowerTick.getSqrtRatioAtTick(),
                upperTick.getSqrtRatioAtTick(),
                amount0,
                amount1
            );

            pool.mint(address(this), lowerTick, upperTick, liquidityMinted, "");
        }

        emit Minted(msg.sender, mintAmount, amount0, amount1);
    }

    struct BurnLocalVars {
        uint256 totalSupply;
        uint256 balanceBefore;
    }

    /**
     * @notice burn burns range vault shares (shares of a Uniswap V3 position) and receive underlying
     * @param burnAmount The number of shares to burn
     * @param minAmountsOut the min desired amounts to be out from burn.
     * @return amount0 amount of token0 transferred to msg.sender for burning {burnAmount}
     * @return amount1 amount of token1 transferred to msg.sender for burning {burnAmount}
     */
    function burn(
        uint256 burnAmount,
        uint256[2] calldata minAmountsOut
    ) external override returns (uint256 amount0, uint256 amount1) {
        if (burnAmount == 0) revert VaultErrors.InvalidBurnAmount();

        BurnLocalVars memory vars;
        vars.totalSupply = totalSupply();
        vars.balanceBefore = balanceOf(msg.sender);
        _burn(msg.sender, burnAmount);

        if (inThePosition) {
            (uint128 liquidity, , , , ) = pool.positions(getPositionID());
            uint256 liquidityBurned_ = FullMath.mulDiv(burnAmount, liquidity, vars.totalSupply);
            uint128 liquidityBurned = uint128(liquidityBurned_);
            (uint256 burn0, uint256 burn1, uint256 fee0, uint256 fee1) = _withdraw(liquidityBurned);

            _applyPerformanceFee(fee0, fee1);
            (fee0, fee1) = _netPerformanceFees(fee0, fee1);
            emit FeesEarned(fee0, fee1);

            uint256 passiveBalance0 = token0.balanceOf(address(this)) - burn0;
            uint256 passiveBalance1 = token1.balanceOf(address(this)) - burn1;
            if (passiveBalance0 > managerBalance0) passiveBalance0 -= managerBalance0;
            if (passiveBalance1 > managerBalance1) passiveBalance1 -= managerBalance1;

            amount0 = burn0 + FullMath.mulDiv(passiveBalance0, burnAmount, vars.totalSupply);
            amount1 = burn1 + FullMath.mulDiv(passiveBalance1, burnAmount, vars.totalSupply);
        } else {
            (uint256 amount0Current, uint256 amount1Current) = getUnderlyingBalances();
            amount0 = FullMath.mulDiv(amount0Current, burnAmount, vars.totalSupply);
            amount1 = FullMath.mulDiv(amount1Current, burnAmount, vars.totalSupply);
        }

        if (amount0 < minAmountsOut[0] || amount1 < minAmountsOut[1])
            revert VaultErrors.SlippageExceedThreshold();

        _applyManagingFee(amount0, amount1);
        (amount0, amount1) = _netManagingFees(amount0, amount1);

        userVaults[msg.sender].token0 =
            (userVaults[msg.sender].token0 * (vars.balanceBefore - burnAmount)) /
            vars.balanceBefore;
        if (amount0 > 0) token0.transfer(msg.sender, amount0);

        userVaults[msg.sender].token1 =
            (userVaults[msg.sender].token1 * (vars.balanceBefore - burnAmount)) /
            vars.balanceBefore;
        if (amount1 > 0) token1.transfer(msg.sender, amount1);

        emit Burned(msg.sender, burnAmount, amount0, amount1);
    }

    /**
     * @notice removeLiquidity removes liquidity from uniswap pool and receives underlying tokens
     * in the vault contract.
     * @param minAmountsOut minimum amounts to get from the pool upon removal of liquidity.
     */
    function removeLiquidity(uint256[2] calldata minAmountsOut) external override {
        (uint128 liquidity, , , , ) = pool.positions(getPositionID());

        if (liquidity > 0) {
            int24 _lowerTick = lowerTick;
            int24 _upperTick = upperTick;
            (uint256 amount0, uint256 amount1, uint256 fee0, uint256 fee1) = _withdraw(liquidity);

            if (amount0 < minAmountsOut[0] || amount1 < minAmountsOut[1])
                revert VaultErrors.SlippageExceedThreshold();

            emit LiquidityRemoved(liquidity, _lowerTick, _upperTick, amount0, amount1);

            _applyPerformanceFee(fee0, fee1);
            (fee0, fee1) = _netPerformanceFees(fee0, fee1);
            emit FeesEarned(fee0, fee1);
        }

        // TicksSet event is not emitted here since the emitting would create a new position on subgraph but
        // the following statement is to only disallow any liquidity provision through the vault unless done
        // by manager (taking into account any features added in future).
        lowerTick = upperTick;
        inThePosition = false;
        emit InThePositionStatusSet(false);
    }

    /**
     * @dev pullFeeFromPool pulls accrued fee from uniswap v3 pool that position has accrued since
     * last collection.
     */
    function pullFeeFromPool() external {
        _pullFeeFromPool();
    }

    /**
     * @notice compute maximum shares that can be minted from `amount0Max` and `amount1Max`
     * @param amount0Max The maximum amount of token0 to forward on mint
     * @param amount1Max The maximum amount of token1 to forward on mint
     * @return amount0 actual amount of token0 to forward when minting `mintAmount`
     * @return amount1 actual amount of token1 to forward when minting `mintAmount`
     * @return mintAmount maximum number of shares mintable
     */
    function getMintAmounts(
        uint256 amount0Max,
        uint256 amount1Max
    ) external view override returns (uint256 amount0, uint256 amount1, uint256 mintAmount) {
        if (!mintStarted) revert VaultErrors.MintNotStarted();
        uint256 totalSupply = totalSupply();
        if (totalSupply > 0) {
            (amount0, amount1, mintAmount) = _calcMintAmounts(totalSupply, amount0Max, amount1Max);
        } else if (inThePosition) {
            (uint160 sqrtRatioX96, , , , , , ) = pool.slot0();
            uint128 newLiquidity = LiquidityAmounts.getLiquidityForAmounts(
                sqrtRatioX96,
                lowerTick.getSqrtRatioAtTick(),
                upperTick.getSqrtRatioAtTick(),
                amount0Max,
                amount1Max
            );
            mintAmount = uint256(newLiquidity);
            (amount0, amount1) = LiquidityAmounts.getAmountsForLiquidity(
                sqrtRatioX96,
                lowerTick.getSqrtRatioAtTick(),
                upperTick.getSqrtRatioAtTick(),
                newLiquidity
            );
        }
    }

    /**
     * @notice getCurrentFees returns the current uncollected fees
     * @return fee0 uncollected fee in token0
     * @return fee1 uncollected fee in token1
     */
    function getCurrentFees() external view override returns (uint256 fee0, uint256 fee1) {
        (, int24 tick, , , , , ) = pool.slot0();
        (
            uint128 liquidity,
            uint256 feeGrowthInside0Last,
            uint256 feeGrowthInside1Last,
            uint128 tokensOwed0,
            uint128 tokensOwed1
        ) = pool.positions(getPositionID());
        fee0 = _feesEarned(true, feeGrowthInside0Last, tick, liquidity) + uint256(tokensOwed0);
        fee1 = _feesEarned(false, feeGrowthInside1Last, tick, liquidity) + uint256(tokensOwed1);
        (fee0, fee1) = _netPerformanceFees(fee0, fee1);
    }

    /**
     * @notice returns array of current user vaults. This function is only intended to be called off-chain.
     * @param fromIdx start index to fetch the user vaults info from.
     * @param toIdx end index to fetch the user vault to.
     */
    function getUserVaults(
        uint256 fromIdx,
        uint256 toIdx
    ) external view override returns (UserVaultInfo[] memory) {
        if (fromIdx == 0 && toIdx == 0) {
            toIdx = users.length;
        }
        UserVaultInfo[] memory usersVaultInfo = new UserVaultInfo[](toIdx - fromIdx);
        uint256 count;
        for (uint256 i = fromIdx; i < toIdx; i++) {
            UserVault memory userVault = userVaults[users[i]];
            usersVaultInfo[count++] = UserVaultInfo({
                user: users[i],
                token0: userVault.token0,
                token1: userVault.token1
            });
        }
        return usersVaultInfo;
    }

    /**
     * @notice getPositionID returns the position id of the vault in uniswap pool
     * @return positionID position id of the vault in uniswap pool
     */
    function getPositionID() public view override returns (bytes32 positionID) {
        return keccak256(abi.encodePacked(address(this), lowerTick, upperTick));
    }

    /**
     * @notice compute total underlying token0 and token1 token supply at current price
     * includes current liquidity invested in uniswap position, current fees earned
     * and any uninvested leftover (but does not include manager fees accrued)
     * @return amount0Current current total underlying balance of token0
     * @return amount1Current current total underlying balance of token1
     */
    function getUnderlyingBalances()
        public
        view
        override
        returns (uint256 amount0Current, uint256 amount1Current)
    {
        (uint160 sqrtRatioX96, int24 tick, , , , , ) = pool.slot0();
        return _getUnderlyingBalances(sqrtRatioX96, tick);
    }

    /**
     * @notice _getUnderlyingBalances internal function to calculate underlying balances
     * @param sqrtRatioX96 price to calculate underlying balances at
     * @param tick tick at the given price
     * @return amount0Current current amount of token0
     * @return amount1Current current amount of token1
     */
    function _getUnderlyingBalances(
        uint160 sqrtRatioX96,
        int24 tick
    ) internal view returns (uint256 amount0Current, uint256 amount1Current) {
        (
            uint128 liquidity,
            uint256 feeGrowthInside0Last,
            uint256 feeGrowthInside1Last,
            uint128 tokensOwed0,
            uint128 tokensOwed1
        ) = pool.positions(getPositionID());

        uint256 fee0;
        uint256 fee1;
        if (liquidity != 0) {
            (amount0Current, amount1Current) = LiquidityAmounts.getAmountsForLiquidity(
                sqrtRatioX96,
                lowerTick.getSqrtRatioAtTick(),
                upperTick.getSqrtRatioAtTick(),
                liquidity
            );
            fee0 = _feesEarned(true, feeGrowthInside0Last, tick, liquidity) + uint256(tokensOwed0);
            fee1 = _feesEarned(false, feeGrowthInside1Last, tick, liquidity) + uint256(tokensOwed1);
            (fee0, fee1) = _netPerformanceFees(fee0, fee1);
            amount0Current += fee0;
            amount1Current += fee1;
        }

        uint256 passiveBalance0 = token0.balanceOf(address(this));
        uint256 passiveBalance1 = token1.balanceOf(address(this));
        amount0Current += passiveBalance0 > managerBalance0
            ? passiveBalance0 - managerBalance0
            : passiveBalance0;
        amount1Current += passiveBalance1 > managerBalance1
            ? passiveBalance1 - managerBalance1
            : passiveBalance1;
    }

    /**
     * @notice _withdraw internal function to withdraw liquidity from uniswap pool
     * @param liquidity liquidity to remove from the uniswap pool
     */
    function _withdraw(
        uint128 liquidity
    ) private returns (uint256 burn0, uint256 burn1, uint256 fee0, uint256 fee1) {
        int24 _lowerTick = lowerTick;
        int24 _upperTick = upperTick;
        uint256 preBalance0 = token0.balanceOf(address(this));
        uint256 preBalance1 = token1.balanceOf(address(this));
        (burn0, burn1) = pool.burn(_lowerTick, _upperTick, liquidity);
        pool.collect(address(this), _lowerTick, _upperTick, type(uint128).max, type(uint128).max);
        fee0 = token0.balanceOf(address(this)) - preBalance0 - burn0;
        fee1 = token1.balanceOf(address(this)) - preBalance1 - burn1;
    }

    /**
     * @notice _calcMintAmounts internal function to calculate the amount based on the max supply of token0 and token1
     * and current supply of RangeVault shares.
     * @param totalSupply current total supply of range vault shares
     * @param amount0Max max amount of token0 to compute mint amount
     * @param amount1Max max amount of token1 to compute mint amount
     */
    function _calcMintAmounts(
        uint256 totalSupply,
        uint256 amount0Max,
        uint256 amount1Max
    ) private view returns (uint256 amount0, uint256 amount1, uint256 mintAmount) {
        (uint256 amount0Current, uint256 amount1Current) = getUnderlyingBalances();
        if (amount0Current == 0 && amount1Current > 0) {
            mintAmount = FullMath.mulDiv(amount1Max, totalSupply, amount1Current);
        } else if (amount1Current == 0 && amount0Current > 0) {
            mintAmount = FullMath.mulDiv(amount0Max, totalSupply, amount0Current);
        } else if (amount0Current == 0 && amount1Current == 0) {
            revert VaultErrors.ZeroUnderlyingBalance();
        } else {
            uint256 amount0Mint = FullMath.mulDiv(amount0Max, totalSupply, amount0Current);
            uint256 amount1Mint = FullMath.mulDiv(amount1Max, totalSupply, amount1Current);
            if (amount0Mint == 0 || amount1Mint == 0) revert VaultErrors.ZeroMintAmount();
            mintAmount = amount0Mint < amount1Mint ? amount0Mint : amount1Mint;
        }

        amount0 = FullMath.mulDivRoundingUp(mintAmount, amount0Current, totalSupply);
        amount1 = FullMath.mulDivRoundingUp(mintAmount, amount1Current, totalSupply);
    }

    /**
     * @notice _feesEarned internal function to return the fees accrued
     * @param isZero true to compute fee for token0 and false to compute fee for token1
     * @param feeGrowthInsideLast last time the fee was realized for the vault in uniswap pool
     */
    function _feesEarned(
        bool isZero,
        uint256 feeGrowthInsideLast,
        int24 tick,
        uint128 liquidity
    ) private view returns (uint256 fee) {
        uint256 feeGrowthOutsideLower;
        uint256 feeGrowthOutsideUpper;
        uint256 feeGrowthGlobal;
        if (isZero) {
            feeGrowthGlobal = pool.feeGrowthGlobal0X128();
            (, , feeGrowthOutsideLower, , , , , ) = pool.ticks(lowerTick);
            (, , feeGrowthOutsideUpper, , , , , ) = pool.ticks(upperTick);
        } else {
            feeGrowthGlobal = pool.feeGrowthGlobal1X128();
            (, , , feeGrowthOutsideLower, , , , ) = pool.ticks(lowerTick);
            (, , , feeGrowthOutsideUpper, , , , ) = pool.ticks(upperTick);
        }

        unchecked {
            uint256 feeGrowthBelow;
            if (tick >= lowerTick) {
                feeGrowthBelow = feeGrowthOutsideLower;
            } else {
                feeGrowthBelow = feeGrowthGlobal - feeGrowthOutsideLower;
            }

            uint256 feeGrowthAbove;
            if (tick < upperTick) {
                feeGrowthAbove = feeGrowthOutsideUpper;
            } else {
                feeGrowthAbove = feeGrowthGlobal - feeGrowthOutsideUpper;
            }
            uint256 feeGrowthInside = feeGrowthGlobal - feeGrowthBelow - feeGrowthAbove;

            fee = FullMath.mulDiv(
                liquidity,
                feeGrowthInside - feeGrowthInsideLast,
                0x100000000000000000000000000000000
            );
        }
    }

    /**
     * @notice _applyManagingFee applies the managing fee to the notional value of the redeeming user.
     * @param amount0 user's notional value in token0
     * @param amount1 user's notional value in token1
     */
    function _applyManagingFee(uint256 amount0, uint256 amount1) private {
        uint256 _managingFee = managingFee;
        managerBalance0 += (amount0 * _managingFee) / 10_000;
        managerBalance1 += (amount1 * _managingFee) / 10_000;
    }

    /**
     * @notice _applyPerformanceFee applies the performance fee to the fees earned from uniswap v3 pool.
     * @param fee0 fee earned in token0
     * @param fee1 fee earned in token1
     */
    function _applyPerformanceFee(uint256 fee0, uint256 fee1) private {
        uint256 _performanceFee = performanceFee;
        managerBalance0 += (fee0 * _performanceFee) / 10_000;
        managerBalance1 += (fee1 * _performanceFee) / 10_000;
    }

    /**
     * @notice _netManagingFees computes the fee share for manager from notional value of the redeeming user.
     * @param amount0 user's notional value in token0
     * @param amount1 user's notional value in token1
     * @return amount0AfterFee user's notional value in token0 after managing fee deduction
     * @return amount1AfterFee user's notional value in token1 after managing fee deduction
     */
    function _netManagingFees(
        uint256 amount0,
        uint256 amount1
    ) private view returns (uint256 amount0AfterFee, uint256 amount1AfterFee) {
        uint256 _managingFee = managingFee;
        uint256 deduct0 = (amount0 * _managingFee) / 10_000;
        uint256 deduct1 = (amount1 * _managingFee) / 10_000;
        amount0AfterFee = amount0 - deduct0;
        amount1AfterFee = amount1 - deduct1;
    }

    /**
     * @notice _netPerformanceFees computes the fee share for manager as performance fee from the fee earned from uniswap v3 pool.
     * @param rawFee0 fee earned in token0 from uniswap v3 pool.
     * @param rawFee1 fee earned in token1 from uniswap v3 pool.
     * @return fee0AfterDeduction fee in token0 earned after deducting performance fee from earned fee.
     * @return fee1AfterDeduction fee in token1 earned after deducting performance fee from earned fee.
     */
    function _netPerformanceFees(
        uint256 rawFee0,
        uint256 rawFee1
    ) private view returns (uint256 fee0AfterDeduction, uint256 fee1AfterDeduction) {
        uint256 _performanceFee = performanceFee;
        uint256 deduct0 = (rawFee0 * _performanceFee) / 10_000;
        uint256 deduct1 = (rawFee1 * _performanceFee) / 10_000;
        fee0AfterDeduction = rawFee0 - deduct0;
        fee1AfterDeduction = rawFee1 - deduct1;
    }

    /**
     * @notice _updateTicks internal function to validate and update ticks
     * _lowerTick lower tick to update
     * _upperTick upper tick to update
     */
    function _updateTicks(int24 _lowerTick, int24 _upperTick) private {
        _validateTicks(_lowerTick, _upperTick);
        lowerTick = _lowerTick;
        upperTick = _upperTick;

        // Upon updating ticks inThePosition status is set to true.
        inThePosition = true;
        emit InThePositionStatusSet(true);
        emit TicksSet(_lowerTick, _upperTick);
    }

    /**
     * @notice _validateTicks validates the upper and lower ticks
     * @param _lowerTick lower tick to validate
     * @param _upperTick upper tick to validate
     */
    function _validateTicks(int24 _lowerTick, int24 _upperTick) private view {
        if (_lowerTick < TickMath.MIN_TICK || _upperTick > TickMath.MAX_TICK)
            revert VaultErrors.TicksOutOfRange();

        if (
            _lowerTick >= _upperTick ||
            _lowerTick % tickSpacing != 0 ||
            _upperTick % tickSpacing != 0
        ) revert VaultErrors.InvalidTicksSpacing();
    }

    /**
     * @notice internal function that pulls fee from the pool
     */
    function _pullFeeFromPool() private {
        (, , uint256 fee0, uint256 fee1) = _withdraw(0);
        _applyPerformanceFee(fee0, fee1);
        (fee0, fee1) = _netPerformanceFees(fee0, fee1);
        emit FeesEarned(fee0, fee1);
    }

    /**
     * @notice internal function that updates the fee percentages for both performance
     * and managing fee.
     * @param newManagingFee new managing fee to set.
     * @param newPerformanceFee new performance fee to set.
     */
    function _updateFees(uint16 newManagingFee, uint16 newPerformanceFee) private {
        if (newManagingFee > MAX_MANAGING_FEE_BPS) revert VaultErrors.InvalidManagingFee();
        if (newPerformanceFee > MAX_PERFORMANCE_FEE_BPS) revert VaultErrors.InvalidPerformanceFee();

        if (inThePosition) _pullFeeFromPool();
        managingFee = newManagingFee;
        performanceFee = newPerformanceFee;
        emit FeesUpdated(newManagingFee, newPerformanceFee);
    }
}
