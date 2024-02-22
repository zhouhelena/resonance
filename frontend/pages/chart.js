import Head from "next/head";
import { useEffect, useRef } from "react";
import { Box, Text, Button, ChakraProvider } from "@chakra-ui/react";
import Header from "./header";
import Chart from "chart.js/auto";

const UNISWAP_SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3";

async function fetchPoolData() {
  const response = await fetch(UNISWAP_SUBGRAPH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          pools(first: 5, orderBy: totalValueLockedUSD, orderDirection: desc) {
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
      <Head>
        <title>Liquidity Pool Performance</title>
      </Head>
      <Header />
      <Box>
        <Text fontSize="xl" my="4">
          Liquidity Pool Performance
        </Text>
        <canvas id="myChart" ref={chartRef}></canvas>
      </Box>
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
