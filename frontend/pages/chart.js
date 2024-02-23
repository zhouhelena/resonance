import Head from "next/head";
import { useEffect, useRef } from "react";
import { Box, Text, Button, ChakraProvider, Flex } from "@chakra-ui/react";
import Header from "./header";
import Chart from "chart.js/auto";

const UNISWAP_SUBGRAPH_URL =
  "https://gateway-arbitrum.network.thegraph.com/api/12184c4fdc9ab0d77f03372ca901f91d/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV";

async function fetchPoolData() {
  const response = await fetch(UNISWAP_SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          pools(orderBy: totalValueLockedUSD, orderDirection: desc, first: 30,  where: {untrackedVolumeUSD_gt:100000}) {
            id
            token0 {
              id
              symbol
            }
            token1 {
              id
              symbol
            }
            totalValueLockedUSD
            volumeUSD
            txCount
          }
        }
      `,
    }),
  });

  const { data } = await response.json();
  console.log(data.pools);
  return data.pools;
}

export default function ChartPage() {
  const chartRef = useRef(null);

  useEffect(() => {
    fetchPoolData().then((pools) => {
      if (chartRef.current) {
        createChart(pools, chartRef.current);
      }
    });
  }, []);

  return (
    <ChakraProvider>
      <Header />
      <Box>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={5}
        >
          <Box
            p="0.5rem"
            bg="white"
            width="1200px"
            height="650px"
            borderRadius="1.37rem"
          >
            <Text
              fontSize="xl"
              my="4"
              color="black"
              fontWeight="500"
              textAlign="center"
            >
              Liquidity Pool Performance
            </Text>
            <canvas id="myChart" ref={chartRef}></canvas>
          </Box>
        </Flex>
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
    </ChakraProvider>
  );
}

function createChart(poolData, ctx) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: poolData.map(
        (pool) => `${pool.token0.symbol}-${pool.token1.symbol}`
      ),
      datasets: [
        {
          label: "Total Value Locked (USD)",
          data: poolData.map((pool) => Number(pool.totalValueLockedUSD)),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
  });
}
