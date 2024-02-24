import * as React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import Second from "../components/second";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Loading() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Second />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
