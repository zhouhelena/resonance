pragma solidity ^0.7.0;

import {ERC20} from "./ERC20/ERC20.sol";

contract USDC is ERC20 {
    constructor() ERC20("USDC", "USDC") {
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
