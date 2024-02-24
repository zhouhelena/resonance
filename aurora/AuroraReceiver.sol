// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title - Contract for sending Ethereum <> Aurora Messages
contract AuroraReceiver {
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

    function receiveTokens(
        bytes memory data
    ) external returns (bytes32 messageId) {
        // Create an AuroraMessage to send a message to Aurora from mainnet
        Client.AuroraMessage memory auroraMessage = Client.AuroraMessage.decode(data);

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
