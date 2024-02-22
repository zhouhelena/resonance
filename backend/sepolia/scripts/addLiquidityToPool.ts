import { ethers } from "hardhat";

const USDC_SEPOLIA_ADDRESS=process.env.USDC_SEPOLIA_ADDRESS || "";
const WETH_SEPOLIA_ADDRESS=process.env.WETH_SEPOLIA_ADDRESS || "";
const UNISWAP_POOL_SEPOLIA_ADDRESS=process.env.UNISWAP_POOL_SEPOLIA_ADDRESS || "";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Calling contracts with the account:", deployer.address);

  // const usdc = await ethers.getContractAt("USDC", USDC_SEPOLIA_ADDRESS);
  // await usdc.waitForDeployment();

  // console.log("Got usdc at", await usdc.getAddress());

  // usdc.approve(UNISWAP_POOL_SEPOLIA_ADDRESS, 1000000);

  // console.log("Approved usdc")

  // const weth = await ethers.getContractAt("WETH", WETH_SEPOLIA_ADDRESS);
  // await weth.waitForDeployment();

  // console.log("Got weth at", await weth.getAddress());

  // weth.approve(UNISWAP_POOL_SEPOLIA_ADDRESS, 1000000);

  // console.log("Approved weth")

  const uniswapPool = await ethers.getContractAt("UniswapV3Pool", UNISWAP_POOL_SEPOLIA_ADDRESS);
  await uniswapPool.waitForDeployment();

  console.log("Got pool at", await uniswapPool.getAddress());

  const bytes = ethers.encodeBytes32String("");
  const tx = await uniswapPool.mint(deployer.address, -886800, 886800, 100, bytes)
  await tx.wait();

  console.log("Minted to pool");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
