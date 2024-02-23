import { Flex, Box, Text, Button } from "@chakra-ui/react";

export default function LoadingPage() {
  return (
    <div>
      <Box
        w="30.62rem"
        mx="auto"
        mt="5.25rem"
        boxShadow="rgb(0 0 0 / 8%) 0rem 0.37rem 0.62rem"
        borderRadius="1.37rem"
      >
        <Box p="0.5rem" bg="white" borderRadius="0 0 1.37rem 1.37rem">
          <Flex
            alignItems="center"
            justifyContent="space-between"
            bg="rgb(247, 248, 250)"
            p="1rem 1rem 1.7rem"
            borderRadius="1.25rem"
            border="0.06rem solid rgb(237, 238, 242)"
          >
            {" "}
            <Text color="black" fontWeight="500">
              Loading Page
            </Text>
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
  );
}
