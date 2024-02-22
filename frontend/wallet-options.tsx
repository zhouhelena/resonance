import * as React from "react";
import { useConnect } from "wagmi";
import { Button } from "@chakra-ui/react";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  const metaMaskConnector = connectors.find(
    (connector) =>
      connector.name === "WalletConnect" || connector.name === "Injected"
  );

  if (!metaMaskConnector) {
    return <p>MetaMask not available</p>;
  }

  return (
    <Button
      onClick={() => connect({ connector: metaMaskConnector })}
      colorScheme="blue"
    >
      Connect to Wallet
    </Button>
  );
}
