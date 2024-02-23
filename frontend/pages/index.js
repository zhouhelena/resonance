import Head from "next/head";
import Header from "./header.js";
import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { SettingsIcon, ChevronDownIcon, ArrowDownIcon } from "@chakra-ui/icons";
import * as React from "react";
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

export default function Home() {
  const [ethValue, setEthValue] = useState("");
  const [polygonValue, setPolygonValue] = useState("");
  const [aptosValue, setAptosValue] = useState("");
  const [arbitrumValue, setArbitrumValue] = useState("");
  const [totalValue, setTotalValue] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    router.push("/loading");
  };

  const totalSum =
    Number(ethValue) +
    Number(polygonValue) +
    Number(aptosValue) +
    Number(arbitrumValue);

  return (
    <ChakraProvider>
      <div>
        <Head>
          <title>LP App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <main>
          <Box
            w="30.62rem"
            mx="auto"
            mt="5.25rem"
            boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
            borderRadius="1.37rem"
          >
            <Flex
              alignItems="center"
              p="1rem 1.25rem 0.5rem"
              bg="white"
              color="rgb(86, 90, 105)"
              justifyContent="space-between"
              borderRadius="1.37rem 1.37rem 0 0"
            >
              <Text color="black" fontWeight="500">
                Invest
              </Text>
              <SettingsIcon
                fontSize="1.25rem"
                cursor="pointer"
                _hover={{ color: "rgb(128,128,128)" }}
              />
            </Flex>

            <Box p="0.5rem" bg="white" borderRadius="0 0 1.37rem 1.37rem">
              <Tabs variant="soft-rounded" colorScheme="pink">
                <TabList justifyContent="center" pb="4">
                  <Tab>Custom</Tab>
                  <Tab>Safe</Tab>
                  <Tab>Aggressive</Tab>
                  <Tab>Sustainable</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {" "}
                    // Tab 1
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      bg="rgb(247, 248, 250)"
                      p="1rem 1rem 1.7rem"
                      borderRadius="1.25rem"
                      border="0.06rem solid rgb(237, 238, 242)"
                    >
                      <Box>
                        <Button
                          bg="white"
                          borderRadius="1.12rem"
                          boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          fontWeight="500"
                          mr="0.5rem"
                          rightIcon={
                            <ChevronDownIcon
                              fontSize="1.37rem"
                              cursor="pointer"
                            />
                          }
                        >
                          {/* TODO: Logo */}
                          {/* <Image
                    boxSize="1.5rem"
                    src={etherLogo}
                    alt="Ether Logo"
                    mr="0.5rem"
                  /> */}
                          USDC
                        </Button>
                      </Box>
                      <Box>
                        <Input
                          placeholder="0.0"
                          fontWeight="500"
                          fontSize="1.5rem"
                          width="100%"
                          size="19rem"
                          textAlign="right"
                          bg="rgb(247, 248, 250)"
                          outline="none"
                          border="none"
                          _focus={{
                            outline: "none",
                            boxShadow: "none",
                          }}
                          // isReadOnly
                          disabled={true}
                          value={totalSum.toFixed(2)}
                          type="number"
                        />
                      </Box>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      bg="rgb(247, 248, 250)"
                      pos="relative"
                      p="1rem 1rem 1.7rem"
                      borderRadius="1.25rem"
                      mt="0.25rem"
                      border="0.06rem solid rgb(237, 238, 242)"
                    >
                      <Box>
                        <Button
                          bg="rgb(232, 0, 111)"
                          color="white"
                          p="0rem 1rem"
                          borderRadius="1.12rem"
                          boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                        >
                          Ethereum
                        </Button>
                      </Box>
                      <Flex
                        alignItems="center"
                        justifyContent="center"
                        bg="white"
                        p="0.18rem"
                        borderRadius="0.75rem"
                        pos="relative"
                        top="-2.37rem"
                        left="2.5rem"
                      >
                        <ArrowDownIcon
                          bg="rgb(247, 248, 250)"
                          color="rgb(128,128,128)"
                          h="1.5rem"
                          width="1.62rem"
                          borderRadius="0.75rem"
                        />
                      </Flex>
                      <Box>
                        <Input
                          placeholder="0.0"
                          fontSize="1.5rem"
                          width="100%"
                          size="19rem"
                          textAlign="right"
                          bg="rgb(247, 248, 250)"
                          outline="none"
                          border="none"
                          _focus={{
                            outline: "none",
                            boxShadow: "none",
                          }}
                          value={ethValue}
                          onChange={(e) => setEthValue(e.target.value)}
                          type="number"
                        />
                      </Box>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      bg="rgb(247, 248, 250)"
                      pos="relative"
                      p="1rem 1rem 1.7rem"
                      borderRadius="1.25rem"
                      mt="0.25rem"
                      border="0.06rem solid rgb(237, 238, 242)"
                    >
                      <Box>
                        <Button
                          bg="rgb(232, 0, 111)"
                          color="white"
                          p="0rem 1rem"
                          borderRadius="1.12rem"
                          boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                        >
                          Polygon
                        </Button>
                      </Box>
                      <Box>
                        <Input
                          placeholder="0.0"
                          fontSize="1.5rem"
                          width="100%"
                          size="19rem"
                          textAlign="right"
                          bg="rgb(247, 248, 250)"
                          outline="none"
                          border="none"
                          _focus={{
                            outline: "none",
                            boxShadow: "none",
                          }}
                          value={polygonValue}
                          onChange={(e) => setPolygonValue(e.target.value)}
                          type="number"
                        />
                      </Box>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      bg="rgb(247, 248, 250)"
                      pos="relative"
                      p="1rem 1rem 1.7rem"
                      borderRadius="1.25rem"
                      mt="0.25rem"
                      border="0.06rem solid rgb(237, 238, 242)"
                    >
                      <Box>
                        <Button
                          bg="rgb(232, 0, 111)"
                          color="white"
                          p="0rem 1rem"
                          borderRadius="1.12rem"
                          boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                        >
                          Aptos
                        </Button>
                      </Box>
                      <Box>
                        <Input
                          placeholder="0.0"
                          fontSize="1.5rem"
                          width="100%"
                          size="19rem"
                          textAlign="right"
                          bg="rgb(247, 248, 250)"
                          outline="none"
                          border="none"
                          _focus={{
                            outline: "none",
                            boxShadow: "none",
                          }}
                          value={aptosValue}
                          onChange={(e) => setAptosValue(e.target.value)}
                          type="number"
                        />
                      </Box>
                    </Flex>
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      bg="rgb(247, 248, 250)"
                      pos="relative"
                      p="1rem 1rem 1.7rem"
                      borderRadius="1.25rem"
                      mt="0.25rem"
                      border="0.06rem solid rgb(237, 238, 242)"
                    >
                      <Box>
                        <Button
                          bg="rgb(232, 0, 111)"
                          color="white"
                          p="0rem 1rem"
                          borderRadius="1.12rem"
                          boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                        >
                          Arbitrum
                        </Button>
                      </Box>
                      <Box>
                        <Input
                          placeholder="0.0"
                          fontSize="1.5rem"
                          width="100%"
                          size="19rem"
                          textAlign="right"
                          bg="rgb(247, 248, 250)"
                          outline="none"
                          border="none"
                          _focus={{
                            outline: "none",
                            boxShadow: "none",
                          }}
                          value={arbitrumValue}
                          onChange={(e) => setArbitrumValue(e.target.value)}
                          type="number"
                        />
                      </Box>
                    </Flex>
                  </TabPanel>
                  <TabPanel>
                    <p>
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="white"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                            fontWeight="500"
                            mr="0.5rem"
                            rightIcon={
                              <ChevronDownIcon
                                fontSize="1.37rem"
                                cursor="pointer"
                              />
                            }
                          >
                            {/* TODO: Logo */}
                            {/* <Image
                    boxSize="1.5rem"
                    src={etherLogo}
                    alt="Ether Logo"
                    mr="0.5rem"
                  /> */}
                            USDC
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontWeight="500"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={totalValue}
                            onChange={(e) => setTotalValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Ethereum
                          </Button>
                        </Box>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          bg="white"
                          p="0.18rem"
                          borderRadius="0.75rem"
                          pos="relative"
                          top="-2.37rem"
                          left="2.5rem"
                        >
                          <ArrowDownIcon
                            bg="rgb(247, 248, 250)"
                            color="rgb(128,128,128)"
                            h="1.5rem"
                            width="1.62rem"
                            borderRadius="0.75rem"
                          />
                        </Flex>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={ethValue}
                            onChange={(e) => setEthValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Polygon
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={polygonValue}
                            onChange={(e) => setPolygonValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Aptos
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={aptosValue}
                            onChange={(e) => setAptosValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Arbitrum
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={arbitrumValue}
                            onChange={(e) => setArbitrumValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>
                    </p>
                  </TabPanel>
                  <TabPanel>
                    <p>
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="white"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                            fontWeight="500"
                            mr="0.5rem"
                            rightIcon={
                              <ChevronDownIcon
                                fontSize="1.37rem"
                                cursor="pointer"
                              />
                            }
                          >
                            {/* TODO: Logo */}
                            {/* <Image
                    boxSize="1.5rem"
                    src={etherLogo}
                    alt="Ether Logo"
                    mr="0.5rem"
                  /> */}
                            USDC
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontWeight="500"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={totalValue}
                            onChange={(e) => setTotalValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Ethereum
                          </Button>
                        </Box>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          bg="white"
                          p="0.18rem"
                          borderRadius="0.75rem"
                          pos="relative"
                          top="-2.37rem"
                          left="2.5rem"
                        >
                          <ArrowDownIcon
                            bg="rgb(247, 248, 250)"
                            color="rgb(128,128,128)"
                            h="1.5rem"
                            width="1.62rem"
                            borderRadius="0.75rem"
                          />
                        </Flex>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={ethValue}
                            onChange={(e) => setEthValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Polygon
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={polygonValue}
                            onChange={(e) => setPolygonValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Aptos
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={aptosValue}
                            onChange={(e) => setAptosValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Arbitrum
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={arbitrumValue}
                            onChange={(e) => setArbitrumValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>
                    </p>
                  </TabPanel>
                  <TabPanel>
                    <p>
                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="white"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                            fontWeight="500"
                            mr="0.5rem"
                            rightIcon={
                              <ChevronDownIcon
                                fontSize="1.37rem"
                                cursor="pointer"
                              />
                            }
                          >
                            {/* TODO: Logo */}
                            {/* <Image
                    boxSize="1.5rem"
                    src={etherLogo}
                    alt="Ether Logo"
                    mr="0.5rem"
                  /> */}
                            USDC
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontWeight="500"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={totalValue}
                            onChange={(e) => setTotalValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Ethereum
                          </Button>
                        </Box>
                        <Flex
                          alignItems="center"
                          justifyContent="center"
                          bg="white"
                          p="0.18rem"
                          borderRadius="0.75rem"
                          pos="relative"
                          top="-2.37rem"
                          left="2.5rem"
                        >
                          <ArrowDownIcon
                            bg="rgb(247, 248, 250)"
                            color="rgb(128,128,128)"
                            h="1.5rem"
                            width="1.62rem"
                            borderRadius="0.75rem"
                          />
                        </Flex>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={ethValue}
                            onChange={(e) => setEthValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Polygon
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={polygonValue}
                            onChange={(e) => setPolygonValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Aptos
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={aptosValue}
                            onChange={(e) => setAptosValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>

                      <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgb(247, 248, 250)"
                        pos="relative"
                        p="1rem 1rem 1.7rem"
                        borderRadius="1.25rem"
                        mt="0.25rem"
                        border="0.06rem solid rgb(237, 238, 242)"
                      >
                        <Box>
                          <Button
                            bg="rgb(232, 0, 111)"
                            color="white"
                            p="0rem 1rem"
                            borderRadius="1.12rem"
                            boxShadow="rgb(0 0 0 / 8%) 0rem 5.25rem 0.62rem"
                          >
                            Arbitrum
                          </Button>
                        </Box>
                        <Box>
                          <Input
                            placeholder="0.0"
                            fontSize="1.5rem"
                            width="100%"
                            size="19rem"
                            textAlign="right"
                            bg="rgb(247, 248, 250)"
                            outline="none"
                            border="none"
                            _focus={{
                              outline: "none",
                              boxShadow: "none",
                            }}
                            value={arbitrumValue}
                            onChange={(e) => setArbitrumValue(e.target.value)}
                            type="number"
                          />
                        </Box>
                      </Flex>
                    </p>
                  </TabPanel>
                </TabPanels>
              </Tabs>

              {/* <Box p={4} pt={6} w="full">
                <Slider
                  aria-label="slider-ex-6"
                  onChange={(val) => setSliderValue(val)}
                >
                  <SliderMark value={25} {...labelStyles}>
                    25%
                  </SliderMark>
                  <SliderMark value={50} {...labelStyles}>
                    50%
                  </SliderMark>
                  <SliderMark value={75} {...labelStyles}>
                    75%
                  </SliderMark>
                  <SliderMark
                    value={sliderValue}
                    textAlign="center"
                    bg="blue.500"
                    color="white"
                    mt="-10"
                    ml="-5"
                    w="12"
                  >
                    {sliderValue}%
                  </SliderMark>
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb />
                </Slider>
              </Box> */}

              <Box mt="0.5rem">
                <Button
                  color="rgb(213, 0, 102)"
                  bg="rgb(253, 234, 241)"
                  width="100%"
                  p="1.62rem"
                  borderRadius="1.25rem"
                  _hover={{ bg: "rgb(251, 211, 225)" }}
                  onClick={handleSubmit}
                >
                  Invest
                </Button>
              </Box>
            </Box>
          </Box>
        </main>
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
          footer img {
            margin-left: 0.5rem;
          }
          footer a {
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: inherit;
          }
          code {
            background: #fafafa;
            border-radius: 5px;
            padding: 0.75rem;
            font-size: 1.1rem;
            font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
              DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
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
      </div>
    </ChakraProvider>
  );
}
