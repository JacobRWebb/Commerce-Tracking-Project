import { Box, ChakraProvider, CSSReset } from "@chakra-ui/react";
import { AppType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ATAS</title>
      </Head>
      <ChakraProvider>
        <CSSReset />
        <Navbar />
        <Box overflow="hidden">
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
