import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const weth = await ethers.deployContract("WETH");

  await weth.waitForDeployment();

  console.log("WETH deployed to:", await weth.getAddress());

  await weth.mint(deployer.address, 1000000);

  console.log("Minted 1000000 WETH to:", deployer.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
