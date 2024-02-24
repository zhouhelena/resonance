pragma solidity ^0.8.4;

import {IRangeProtocolVault} from "./range/interfaces/IRangeProtocolVault.sol";
import {Sender} from "./ccip/Sender.sol";
import {AptosSender} from "./aptos/AptosSender.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Router {
    IRangeProtocolVault private s_vault;

    IERC20 private s_usdc;

    Sender private s_sender_arbitrum;
    Sender private s_sender_polygon;
    AptosSender private s_sender_aptos;
    AuroraSender private s_sender_aurora;

    address private s_receiver_arbitrum;
    address private s_receiver_polygon;

    uint64 private s_arbitrum_selector;
    uint64 private s_polygon_selector;

    constructor(
        address _vault, 
        address _sender_arbitrum, 
        address _sender_polygon, 
        address _sender_aptos, 
        address _sender_aurora,
        address _receiver_arbitrum, 
        address _receiver_polygon,
        uint64 _arbitrum_selector,
        uint64 _polygon_selector,
        address _usdc
    ) {
        s_vault = IRangeProtocolVault(_vault);
        s_sender_arbitrum = Sender(_sender_arbitrum);
        s_sender_polygon = Sender(_sender_polygon);
        s_sender_aptos = AptosSender(_sender_aptos);
        s_sender_aurora = AuroraSender(_sender_aurora);
        s_receiver_arbitrum = _receiver_arbitrum;
        s_receiver_polygon = _receiver_polygon;
        s_arbitrum_selector = _arbitrum_selector;
        s_polygon_selector = _polygon_selector;
        s_usdc = IERC20(_usdc);
    }

    function deployCapital(
        uint256 _ethAmount, 
        uint256 _arbitrumAmount, 
        uint256 _polygonAmount, 
        uint256 _aptosAmount, 
        uint256 _auroraAmount
    ) external {
        s_usdc.approve(address(s_vault), 1_000_000);
        s_vault.mint(_ethAmount, [uint256(1_000_000), uint256(1_000_000)]);
        s_sender_arbitrum.sendTokens(s_arbitrum_selector, s_receiver_arbitrum, _arbitrumAmount);
        s_sender_polygon.sendTokens(s_polygon_selector, s_receiver_polygon, _polygonAmount);
        s_sender_aptos.sendTokens(s_aptos_amount);
        s_sender_aurora.sendTokens(s_aurora_amount);
    }
}