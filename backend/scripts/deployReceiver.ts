import { ethers, network } from "hardhat";

async function main() {
    let CCIP_ROUTER_ADDRESS = "";
    switch (network.name) {
        case "sepolia":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_SEPOLIA_ADDRESS || "";
            break;
        case "arbitrum":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_ARBITRUM_ADDRESS || "";
            break;
        case "mumbai":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_MUMBAI_ADDRESS || "";
            break;
        default:
            throw new Error("Unsupported network");
    }

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);


    const sender = await ethers.deployContract("Receiver", [CCIP_ROUTER_ADDRESS]);
    await sender.waitForDeployment();

    console.log("Receiver deployed to:", await sender.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
