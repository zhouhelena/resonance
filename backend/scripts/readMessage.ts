import { ethers, network } from "hardhat";

async function main() {
    const SENDER_ADDRESS = "0x040EcA942dd2B6e8f208Bd55E8A12b9dE921e1d1";
    const RECEIVER_ADDRESS = "0x12dC0CCD44078AE83360c3c2C852F0d8Fd23F07A";
    const DESTINATION_CHAIN_SELECTOR = "12532609583862916517";

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const receiver = await ethers.getContractAt("Receiver", RECEIVER_ADDRESS);

    console.log("Received message:", await receiver.getLastReceivedMessageDetails());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
