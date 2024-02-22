import { ReactNode } from "react";
import { Flex, Box, Button, Text, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "../config";
import { Account } from "../account";
import { WalletOptions } from "../wallet-options";

const queryClient = new QueryClient();

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Header() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Box as="nav">
          <Flex
            align="center"
            justify="space-between"
            maxW="83.43rem"
            mx="auto"
            mt="1.5rem"
            px="4"
          >
            {/* Logo on the left
        <Image boxSize="1.56rem" src={logo} alt="Uniswap Logo" /> */}

            <NextLink href="/" passHref>
              <Link mr="4" _hover={{ textDecoration: "underline" }}>
                Invest
              </Link>
            </NextLink>

            <Flex align="center">
              <NextLink href="/chart" passHref>
                <Link mr="4" _hover={{ textDecoration: "underline" }}>
                  Chart
                </Link>
              </NextLink>

              <ConnectWallet />
            </Flex>
          </Flex>
        </Box>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
