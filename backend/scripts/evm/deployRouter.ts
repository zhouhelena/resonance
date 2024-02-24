import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const router = await ethers.deployContract("Router" , [
    process.env.RANGE_VAULT_SEPOLIA_ADDRESS || "0x0",
    process.env.SENDER_SEPOLIA_ADDRESS || "0x0",
    process.env.SENDER_SEPOLIA_ADDRESS || "0x0",
    process.env.SENDER_SEPOLIA_ADDRESS || "0x0",
    process.env.RECEIVER_ARBITRUM_ADDRESS || "0x0",
    process.env.RECEIVER_MUMBAI_ADDRESS || "0x0",
    process.env.ARBITRUM_DESTINATION_ADDRESS || "",
    process.env.MUMBAI_DESTINATION_ADDRESS || "",
    process.env.USDC_SEPOLIA_ADDRESS || "0x0",
  ]);
  
  await router.waitForDeployment();

  console.log("Router deployed to:", await router.getAddress());

  const usdc = await ethers.getContractAt("CustomToken", process.env.USDC_SEPOLIA_ADDRESS || "");

  console.log("USDC deployed to:", await usdc.getAddress());

  const mintTx = await usdc.mint(router.getAddress(), 1_000_000_000);
    await mintTx.wait();

  console.log("Minted tokens")

    const weth = await ethers.getContractAt("CustomToken", process.env.WETH_SEPOLIA_ADDRESS || "");

    console.log("WETH deployed to:", await weth.getAddress());
  
    const mintWethTx = await weth.mint(router.getAddress(), 1_000_000_000);
      await mintWethTx.wait();

  console.log("Minted tokens")

  const tx = await router.deployCapital(
    60,
    60,
    60,
    60,
    60,
  )
  await tx.wait()
  console.log("Capital deployed")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
