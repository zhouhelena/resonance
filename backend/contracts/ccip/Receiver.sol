// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IRangeProtocolVault} from "../range/interfaces/IRangeProtocolVault.sol";

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */

/// @title - A simple contract for receiving string data across chains.
contract Receiver is CCIPReceiver {
    // Event emitted when a message is received from another chain.
    event TokensReceived(
        bytes32 indexed messageId, // The unique ID of the message.
        uint64 indexed sourceChainSelector, // The chain selector of the source chain.
        address sender, // The address of the sender from the source chain.
        uint256 amount // The amount of tokens received.
    );

    bytes32 private s_lastReceivedMessageId; // Store the last received messageId.
    uint256 private s_lastReceivedAmount; // Store the last received text.

    IERC20 private s_usdc;
    IRangeProtocolVault private s_vault;

    /// @notice Constructor initializes the contract with the router address.
    /// @param router The address of the router contract.
    constructor(address router, address _usdc, address _vault) CCIPReceiver(router) {
        s_usdc = IERC20(_usdc);
        s_vault = IRangeProtocolVault(_vault);
    }

    /// handle a received message
    function _ccipReceive(
        Client.Any2EVMMessage memory any2EvmMessage
    ) internal override {
        s_lastReceivedMessageId = any2EvmMessage.messageId; // fetch the messageId
        s_lastReceivedAmount = abi.decode(any2EvmMessage.data, (uint256)); // fetch the amount

        emit TokensReceived(
            any2EvmMessage.messageId,
            any2EvmMessage.sourceChainSelector, // fetch the source chain identifier (aka selector)
            abi.decode(any2EvmMessage.sender, (address)), // abi-decoding of the sender address,
            abi.decode(any2EvmMessage.data, (uint256)) // fetch the amount
        );

        s_usdc.approve(address(s_vault), s_lastReceivedAmount); // approve the amount to be spent by the vault
        s_vault.mint(60, [s_lastReceivedAmount, 0]); // mint the vault tokens
    }

    /// @notice Fetches the details of the last received message.
    /// @return messageId The ID of the last received message.
    /// @return amount The last received amount.
    function getLastReceivedMessageDetails()
        external
        view
        returns (bytes32 messageId, uint256 amount)
    {
        return (s_lastReceivedMessageId, s_lastReceivedAmount);
    }

    receive () external payable {}
}
