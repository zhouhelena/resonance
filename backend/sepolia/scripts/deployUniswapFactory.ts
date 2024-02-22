import { ethers } from "hardhat";

const USDC_SEPOLIA_ADDRESS=process.env.USDC_SEPOLIA_ADDRESS || "";
const WETH_SEPOLIA_ADDRESS=process.env.WETH_SEPOLIA_ADDRESS || "";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const uniswapFactory = await ethers.deployContract("UniswapV3Factory");

  await uniswapFactory.waitForDeployment();

  console.log("UniswapFactory deployed to:", await uniswapFactory.getAddress());

  const createPoolTx = await uniswapFactory.createPool(USDC_SEPOLIA_ADDRESS, WETH_SEPOLIA_ADDRESS, 3000);
  const createPoolReceipt = await createPoolTx.wait();
  // @ts-ignore
  const poolAddress = createPoolReceipt?.logs?.[0]?.args?.[4];

  console.log("Created pool at", poolAddress);

  const uniswapPool = await ethers.getContractAt("UniswapV3Pool", poolAddress);


  const initTx = await uniswapPool.initialize(1_000_000_000_000_00);
  await initTx.wait();

  console.log("Initialized pool");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
