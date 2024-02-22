pragma solidity ^0.7.0;

import {ERC20} from "./ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("WETH", "WETH") {
    }

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
