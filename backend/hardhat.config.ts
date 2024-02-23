import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const ALCHEMY_SEPOLIA_KEY = process.env.ALCHEMY_SEPOLIA_KEY || "";
const ALCHEMY_ARBITRUM_KEY = process.env.ALCHEMY_ARBITRUM_KEY || "";
const ALCHEMY_MUMBAI_KEY = process.env.ALCHEMY_MUMBAI_KEY || "";

const EVM_PRIVATE_KEY = process.env.EVM_PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ]
  },
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    localhost: {
      allowUnlimitedContractSize: true,
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`,
      accounts: [EVM_PRIVATE_KEY],
    },
    arbitrum: {
      chainId: 421614,
      url: `https://arb-sepolia.g.alchemy.com/v2/${ALCHEMY_ARBITRUM_KEY}`,
      accounts: [EVM_PRIVATE_KEY],
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_MUMBAI_KEY}`,
      accounts: [EVM_PRIVATE_KEY],
    }
  }
};

export default config;
