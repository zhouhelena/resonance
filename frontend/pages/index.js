import * as React from "react";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import Main from "../components/main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Home() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
