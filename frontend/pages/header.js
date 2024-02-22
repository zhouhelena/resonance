import { ReactNode } from "react";
import { Flex, Box, Button, Text, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Header() {
  return (
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

          <Button colorScheme="blue">Connect to Wallet</Button>
        </Flex>
      </Flex>
    </Box>
  );
}
