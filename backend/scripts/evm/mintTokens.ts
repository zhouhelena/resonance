import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const usdc = await ethers.getContractAt("CustomToken", process.env.USDC_SEPOLIA_ADDRESS || "");

  console.log("USDC deployed to:", await usdc.getAddress());

  const mintTx = await usdc.mint("0x276c6a18479ceDA2e71612c160a4ce6AD3a0EBa2", 1_000_000_000);
    await mintTx.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
