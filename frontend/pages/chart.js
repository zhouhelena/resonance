import Head from "next/head";
import { Box, Text, Button } from "@chakra-ui/react";
import Header from "./header";
import { ChakraProvider } from "@chakra-ui/react";

export default function Chart() {
  return (
    <ChakraProvider>
      <div>
        <Head>
          <title>Chart</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Box as="main" p="4">
          <Text fontSize="xl" mb="4">
            Chart Information
          </Text>
          <Text>Chart Page</Text>
          <Button mt="4" colorScheme="blue">
            Example Button
          </Button>
        </Box>
      </div>
    </ChakraProvider>
  );
}
