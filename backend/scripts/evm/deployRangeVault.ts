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
    default:
      throw new Error("Unsupported network");
  }

  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const rangeVault = await ethers.deployContract("RangeProtocolVault", ["USDC-WETH", "UW"]);

  await rangeVault.waitForDeployment();

  console.log("Range Vault deployed to:", await rangeVault.getAddress());

  const initTx = await rangeVault.initialize(UNISWAP_POOL_ADDRESS, 60, deployer.address);
  await initTx.wait();

  console.log("Initialized vault");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
