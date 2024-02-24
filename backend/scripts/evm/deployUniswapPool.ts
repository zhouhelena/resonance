import { ethers, network } from "hardhat";

async function main() {
  let USDC_ADDRESS = "";
  let WETH_ADDRESS = "";
  switch (network.name) {
    case "sepolia":
      USDC_ADDRESS = process.env.USDC_SEPOLIA_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_SEPOLIA_ADDRESS || "";
      break;
    case "arbitrum":
      USDC_ADDRESS = process.env.USDC_ARBITRUM_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_ARBITRUM_ADDRESS || "";
      break;
    case "mumbai":
      USDC_ADDRESS = process.env.USDC_MUMBAI_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_MUMBAI_ADDRESS || "";
      break;
    case "localhost":
      USDC_ADDRESS = process.env.USDC_LOCALHOST_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_LOCALHOST_ADDRESS || "";
      break;
    case "aurora":
      USDC_ADDRESS = process.env.USDC_AURORA_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_AURORA_ADDRESS || "";
      break;
    default:
      throw new Error("Unsupported network");
  }

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const uniswapFactory = await ethers.deployContract("UniswapV3Factory");

  await uniswapFactory.waitForDeployment();

  console.log("UniswapFactory deployed to:", await uniswapFactory.getAddress());

  const createPoolTx = await uniswapFactory.createPool(USDC_ADDRESS, WETH_ADDRESS, 3000);
  const createPoolReceipt = await createPoolTx.wait();
  // @ts-ignore
  const poolAddress = createPoolReceipt?.logs?.[0]?.args?.[4];

  console.log("Created pool at", poolAddress);

  const uniswapPool = await ethers.getContractAt("UniswapV3Pool", poolAddress);

  console.log("Tick spacing is", await uniswapPool.tickSpacing());

  const initTx = await uniswapPool.initialize(1_000_000_000_000_00);
  await initTx.wait();

  console.log("Initialized pool");
  console.log("Current tick is", await uniswapPool.slot0());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
