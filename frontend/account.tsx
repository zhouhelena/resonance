import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import { Box, Button, Flex, ChakraProvider } from "@chakra-ui/react";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <ChakraProvider>
      <Box p="0.5rem" bg="white" borderRadius="1.37rem">
        <Box p="0.5rem">
          {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
          <Flex alignItems="center" justifyContent="center">
            {address && (
              <div>
                {ensName
                  ? `${ensName} (${address.slice(0, 6)}...${address.slice(-4)})`
                  : `${address.slice(0, 6)}...${address.slice(-4)}`}
              </div>
            )}
          </Flex>
          <Flex alignItems="center" justifyContent="center" p="1rem 0rem 0rem">
            <Button onClick={() => disconnect()}>Disconnect</Button>
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
}
