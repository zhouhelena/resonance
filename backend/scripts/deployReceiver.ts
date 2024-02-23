import { ethers, network } from "hardhat";

async function main() {
    let CCIP_ROUTER_ADDRESS = "";
    let USDC_ADDRESS = "";
    let UNISWAP_POOL_ADDRESS = "";
    switch (network.name) {
        case "sepolia":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_SEPOLIA_ADDRESS || "";
            USDC_ADDRESS = process.env.USDC_SEPOLIA_ADDRESS || "";
            UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_SEPOLIA_ADDRESS || "";
            break;
        case "arbitrum":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_ARBITRUM_ADDRESS || "";
            USDC_ADDRESS = process.env.USDC_ARBITRUM_ADDRESS || "";
            UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_ARBITRUM_ADDRESS || "";
            break;
        case "mumbai":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_MUMBAI_ADDRESS || "";
            USDC_ADDRESS = process.env.USDC_MUMBAI_ADDRESS || "";
            UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_MUMBAI_ADDRESS || "";
            break;
        default:
            throw new Error("Unsupported network");
    }

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const receiver = await ethers.deployContract("Receiver", [CCIP_ROUTER_ADDRESS, USDC_ADDRESS, UNISWAP_POOL_ADDRESS]);
    await receiver.waitForDeployment();

    console.log("Receiver deployed to:", await receiver.getAddress());

    const usdc = await ethers.getContractAt("USDC", USDC_ADDRESS);
    console.log("Got usdc at", await usdc.getAddress());

    const mintTx = await usdc.mint(await receiver.getAddress(), ethers.parseEther("100000"));
    await mintTx.wait();

    console.log("Minted 100000 USDC to:", await receiver.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
