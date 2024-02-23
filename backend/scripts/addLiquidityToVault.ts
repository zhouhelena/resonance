import { ethers, network } from "hardhat";

async function main() {
  let USDC_ADDRESS = "";
  let WETH_ADDRESS = "";
  let RANGE_VAULT_ADDRESS = "";
  switch (network.name) {
    case "sepolia":
      USDC_ADDRESS = process.env.USDC_SEPOLIA_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_SEPOLIA_ADDRESS || "";
      RANGE_VAULT_ADDRESS = process.env.RANGE_VAULT_SEPOLIA_ADDRESS || "";
      break;
    case "arbitrum":
      USDC_ADDRESS = process.env.USDC_ARBITRUM_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_ARBITRUM_ADDRESS || "";
      RANGE_VAULT_ADDRESS = process.env.RANGE_VAULT_ARBITRUM_ADDRESS || "";
      break;
    case "mumbai":
      USDC_ADDRESS = process.env.USDC_MUMBAI_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_MUMBAI_ADDRESS || "";
      RANGE_VAULT_ADDRESS = process.env.RANGE_VAULT_MUMBAI_ADDRESS || "";
      break;
    case "localhost":
      USDC_ADDRESS = process.env.USDC_LOCALHOST_ADDRESS || "";
      WETH_ADDRESS = process.env.WETH_LOCALHOST_ADDRESS || "";
      RANGE_VAULT_ADDRESS = process.env.RANGE_VAULT_LOCALHOST_ADDRESS || "";
      break;
    default:
      throw new Error("Unsupported network");
  }

  const [deployer] = await ethers.getSigners();

  console.log("Calling contracts with the account:", deployer.address);

  const usdc = await ethers.getContractAt("IERC20", USDC_ADDRESS);

  console.log("Got usdc at", await usdc.getAddress());

  const usdcApproveTx = await usdc.approve(RANGE_VAULT_ADDRESS, 1_000_000);
  await usdcApproveTx.wait();

  console.log("Approved usdc")

  const weth = await ethers.getContractAt("IERC20", WETH_ADDRESS);

  console.log("Got weth at", await weth.getAddress());

  const wethApproveTx = await weth.approve(RANGE_VAULT_ADDRESS, 1_000_000);
  await wethApproveTx.wait();

  console.log("Approved weth")

  const rangeVault = await ethers.getContractAt("RangeProtocolVault", RANGE_VAULT_ADDRESS);

  console.log("Got vault at", await rangeVault.getAddress());

  const setTicksTx = await rangeVault.setTicks(-6_000, 6_000);
  await setTicksTx.wait();

  console.log("Set ticks")

  const bytes = ethers.encodeBytes32String("");
  const tx = await rangeVault.mint(60, [1_000_000, 1_000_000])
  await tx.wait();

  console.log("Minted to vault");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
