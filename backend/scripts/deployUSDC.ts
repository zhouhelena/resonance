import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const usdc = await ethers.deployContract("USDC");

  await usdc.waitForDeployment();

  console.log("USDC deployed to:", await usdc.getAddress());

  const mintTx = await usdc.mint(deployer.address, 1000000);
  await mintTx.wait();

  console.log("Minted 1000000 USDC to:", deployer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
