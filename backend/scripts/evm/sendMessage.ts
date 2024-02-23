import { ethers, network } from "hardhat";

async function main() {
    let USDC_ADDRESS = "";
    let UNISWAP_POOL_ADDRESS = "";
    let SENDER_ADDRESS = "";
    switch (network.name) {
        case "sepolia":
            USDC_ADDRESS = process.env.USDC_SEPOLIA_ADDRESS || "";
            UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_SEPOLIA_ADDRESS || "";
            SENDER_ADDRESS = process.env.SENDER_SEPOLIA_ADDRESS || "";
            break;
        case "arbitrum":
            USDC_ADDRESS = process.env.USDC_ARBITRUM_ADDRESS || "";
            UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_ARBITRUM_ADDRESS || "";
            SENDER_ADDRESS = process.env.SENDER_ARBITRUM_ADDRESS || "";
            break;
        case "mumbai":
            USDC_ADDRESS = process.env.USDC_MUMBAI_ADDRESS || "";
            UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_MUMBAI_ADDRESS || "";
            SENDER_ADDRESS = process.env.SENDER_MUMBAI_ADDRESS || "";
            break;
        default:
            throw new Error("Unsupported network");
    }

    let RECEIVER_ADDRESS = "";
    let DESTINATION_CHAIN_SELECTOR = "";

    let destination = process.env.DESTINATION || "";
    switch (destination) {
        case "sepolia":
            RECEIVER_ADDRESS = process.env.RECEIVER_SEPOLIA_ADDRESS || "";
            DESTINATION_CHAIN_SELECTOR = process.env.SEPOLIA_DESTINATION_ADDRESS || "";
            break;
        case "arbitrum":
            RECEIVER_ADDRESS = process.env.RECEIVER_ARBITRUM_ADDRESS || "";
            DESTINATION_CHAIN_SELECTOR = process.env.ARBITRUM_DESTINATION_ADDRESS || "";
            break;
        case "mumbai":
            RECEIVER_ADDRESS = process.env.RECEIVER_MUMBAI_ADDRESS || "";
            DESTINATION_CHAIN_SELECTOR = process.env.MUMBAI_DESTINATION_ADDRESS || "";
            break;
        default:
            break;
    }

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const sender = await ethers.getContractAt("Sender", SENDER_ADDRESS);
    console.log("Got sender contract at:", await sender.getAddress());

    const usdc = await ethers.getContractAt("ERC20", USDC_ADDRESS);
    console.log("Got usdc at:", await usdc.getAddress());

    const sendMessageTx = await sender.sendTokens(DESTINATION_CHAIN_SELECTOR, RECEIVER_ADDRESS, 10);
    await sendMessageTx.wait();

    console.log("Sent message to:", RECEIVER_ADDRESS);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
