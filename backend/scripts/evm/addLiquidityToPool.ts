import { ethers, network } from "hardhat";

async function main() {
  let USDC_ADDRESS = "";
  let WETH_ADDRESS = "";
  let UNISWAP_POOL_ADDRESS = "";
  switch (network.name) {
    case "sepolia":
      USDC_ADDRESS = process.env.USDC_SEPOLIA_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_SEPOLIA_ADDRESS || "";
      UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_SEPOLIA_ADDRESS || "";
      break;
    case "arbitrum":
      USDC_ADDRESS = process.env.USDC_ARBITRUM_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_ARBITRUM_ADDRESS || "";
      UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_ARBITRUM_ADDRESS || "";
      break;
    case "mumbai":
      USDC_ADDRESS = process.env.USDC_MUMBAI_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_MUMBAI_ADDRESS || "";
      UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_MUMBAI_ADDRESS || "";
      break;
    case "localhost":
      USDC_ADDRESS = process.env.USDC_LOCALHOST_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_LOCALHOST_ADDRESS || "";
      UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_LOCALHOST_ADDRESS || "";
      break;
    case "aurora":
      USDC_ADDRESS = process.env.USDC_AURORA_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_AURORA_ADDRESS || "";
      UNISWAP_POOL_ADDRESS = process.env.UNISWAP_POOL_AURORA_ADDRESS || "";
      break;
    default:
      throw new Error("Unsupported network");
  }

  const [deployer] = await ethers.getSigners();

  console.log("Calling contracts with the account:", deployer.address);

  const usdc = await ethers.getContractAt("CustomToken", USDC_ADDRESS);

  console.log("Got usdc at", await usdc.getAddress());

  const usdcApproveTx = await usdc.approve(UNISWAP_POOL_ADDRESS, 1000000);
  await usdcApproveTx.wait();

  console.log("Approved usdc")

  const weth = await ethers.getContractAt("CustomToken", WETH_ADDRESS);

  console.log("Got weth at", await weth.getAddress());

  const wethApproveTx = await weth.approve(UNISWAP_POOL_ADDRESS, 1000000);
  await wethApproveTx.wait();

  console.log("Approved weth")

  const uniswapPool = await ethers.getContractAt("UniswapV3Pool", UNISWAP_POOL_ADDRESS);

  console.log("Got pool at", await uniswapPool.getAddress());
  console.log("token0:", await uniswapPool.token0());
  console.log("token1:", await uniswapPool.token1());

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
