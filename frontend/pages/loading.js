import { Flex, Box, Text, Button, ChakraProvider } from "@chakra-ui/react";
import Header from "./header.js";

export default function LoadingPage() {
  return (
    <ChakraProvider>
      <Header />
      <Box
        w="30.62rem"
        mx="auto"
        mt="5.25rem"
        boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
        borderRadius="1.37rem"
      >
        <Box p="0.5rem" bg="white" h="30rem" borderRadius="1.37rem">
          <Flex
            alignItems="center"
            justifyContent="center"
            p="1rem 1rem 1.7rem"
          >
            <Text>Loading...</Text>
          </Flex>
        </Box>
      </Box>
      <style jsx>{`
        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </ChakraProvider>
  );
}
