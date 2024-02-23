import { ethers, network } from "hardhat";

async function main() {
    const SENDER_ADDRESS = "0x41B9FA8048bcFd2ac567F2DE81C0366ad985C017";
    const RECEIVER_ADDRESS = "0x338328f2d4abbA2E425C0780837A5F1d4F391Ce4";
    const DESTINATION_CHAIN_SELECTOR = "16015286601757825753";

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const sender = await ethers.getContractAt("Sender", SENDER_ADDRESS);
    console.log("Got sender contract at:", await sender.getAddress());

    const sendMessageTx = await sender.sendMessagePayLink(DESTINATION_CHAIN_SELECTOR, RECEIVER_ADDRESS, "Hello, world!");
    await sendMessageTx.wait();

    console.log("Sent message to:", RECEIVER_ADDRESS);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
