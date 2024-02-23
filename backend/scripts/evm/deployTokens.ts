import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const usdc = await ethers.deployContract("CustomToken", ["USDC", "USDC"]);

  await usdc.waitForDeployment();

  console.log("USDC deployed to:", await usdc.getAddress());

  const weth = await ethers.deployContract("CustomToken", ["WETH", "WETH"]);

  await weth.waitForDeployment();

  console.log("WETH deployed to:", await weth.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
