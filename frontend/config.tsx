import { http, createConfig, WagmiConfig, configureChains } from "wagmi";
import { base, mainnet, optimism, sepolia } from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from "wagmi/connectors";
import { publicProvider } from "wagmi/providers/public";

const projectId = "5de51ecb8a548d3ee616184969de8026";

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );

export const config = createConfig({
  chains: [mainnet, base, sepolia],
  connectors: [injected(), walletConnect({ projectId }), metaMask(), safe()],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
  },
  // publicClient,
  // webSocketPublicClient,
  autoConnect: true,
});
