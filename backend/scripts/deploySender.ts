import { ethers, network } from "hardhat";

async function main() {
    let CCIP_ROUTER_ADDRESS = "";
    let CCIP_LINK_ADDRESS = "";
    switch (network.name) {
        case "sepolia":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_SEPOLIA_ADDRESS || "";
            CCIP_LINK_ADDRESS = process.env.CCIP_LINK_SEPOLIA_ADDRESS || "";
            break;
        case "arbitrum":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_ARBITRUM_ADDRESS || "";
            CCIP_LINK_ADDRESS = process.env.CCIP_LINK_ARBITRUM_ADDRESS || "";
            break;
        case "mumbai":
            CCIP_ROUTER_ADDRESS = process.env.CCIP_ROUTER_MUMBAI_ADDRESS || "";
            CCIP_LINK_ADDRESS = process.env.CCIP_LINK_MUMBAI_ADDRESS || "";
            break;
        default:
            throw new Error("Unsupported network");
    }

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);


    const sender = await ethers.deployContract("Sender", [CCIP_ROUTER_ADDRESS, CCIP_LINK_ADDRESS]);
    await sender.waitForDeployment();

    console.log("Sender deployed to:", await sender.getAddress());

    const link = await ethers.getContractAt("ERC20", CCIP_LINK_ADDRESS);
    console.log("Got link at", await link.getAddress());

    const linkTx = await link.transfer(await sender.getAddress(), ethers.parseEther("0.2"));
    await linkTx.wait();

    console.log("Sent 0.2 LINK to:", await sender.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
