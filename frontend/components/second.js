import {
  Flex,
  Box,
  Text,
  Button,
  Stack,
  ChakraProvider,
} from "@chakra-ui/react";
import Header from "../pages/header.js";
import { useWaitForTransactionReceipt } from "wagmi";
import { useRouter } from "next/router";

export default function Second() {
  const router = useRouter();
  const { hash } = router.query;
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleClick = () => {
    const url = `https://sepolia.etherscan.io/tx/${hash}`;
    window.open(url, "_blank");
  };

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
        <Box p="0.5rem" bg="white" h="20rem" borderRadius="1.37rem">
          <Flex justifyContent="center" p="3rem 1rem 1.7rem">
            <Stack spacing={3} w="25rem" justifyContent="center">
              {isConfirming && (
                <Text fontSize="xl" as="b">
                  Waiting for confirmation...
                </Text>
              )}
              {isConfirmed && (
                <Text fontSize="xl" as="b">
                  Transaction confirmed.
                </Text>
              )}
              {hash && <Text fontSize="lg">Transaction Hash: {hash}</Text>}
              <Flex justifyContent="center" p="3rem 1rem 1.7rem">
                <Button
                  color="rgb(213, 0, 102)"
                  bg="rgb(253, 234, 241)"
                  width="100%"
                  p="1.7rem"
                  mt="-1rem"
                  borderRadius="1.25rem"
                  _hover={{ bg: "rgb(251, 211, 225)" }}
                  onClick={handleClick}
                >
                  Watch
                </Button>
              </Flex>
            </Stack>
          </Flex>
        </Box>
      </Box>
      <footer></footer>
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
