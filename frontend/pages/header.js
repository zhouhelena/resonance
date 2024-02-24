import { ReactNode } from "react";
import { Flex, Box, Button, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { config } from "../config";
import { Account } from "../account";
import { WalletOptions } from "../wallet-options";
import logo from "../logo.png";
import Image from "next/image";

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
        <Box as="nav" height="60px">
          <Flex
            align="center"
            justify="space-between"
            maxW="83.43rem"
            mx="auto"
            mt="1.5rem"
            px="4"
          >
            <Image height={70} src={logo} alt="Resonance Logo" />

            <Flex align="center">
              <NextLink href="/" passHref>
                <Link mr="4" _hover={{ textDecoration: "underline" }}>
                  Invest
                </Link>
              </NextLink>
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
