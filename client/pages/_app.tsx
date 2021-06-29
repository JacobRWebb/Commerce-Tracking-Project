import { AppType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import EntryContextProvider from "../context/EntryContext";
// import "../styles/globals.scss";
// import "../styles/index.scss";

const App: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <EntryContextProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Tracker</title>
        </Head>
        <Component {...pageProps} />
      </EntryContextProvider>
    </>
  );
};

export default App;
