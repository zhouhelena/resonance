// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title - Contract for sending Ethereum <> Aurora Messages
contract AuroraSender {
    event TokensSent(
        bytes32 indexed messageId,
        address receiver,
        uint256 amount
    );

    IRouterClient private s_router;

    IERC20 private s_usdc;

    constructor(address _router, address _usdc) {
        s_router = IRouterClient(_router);
        s_usdc = IERC20(_usdc);
    }

    function sendTokens(
        address receiver,
        uint256 amount
    ) external returns (bytes32 messageId) {
        // Create an AuroraMessage to send a message to Aurora from mainnet
        Client.AuroraMessage memory auroraMessage = Client.AuroraMessage({
            receiver: abi.encode(receiver), // ABI-encoded receiver address
            data: abi.encode(amount) // ABI-encoded amount
        });

        // Emit an event with message details
        emit TokensSent(
            messageId,
            destinationChainSelector,
            receiver,
            amount,
            address(s_linkToken),
            fees
        );

        // Return the message ID
        return messageId;
    }
}
