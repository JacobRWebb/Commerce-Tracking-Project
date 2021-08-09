import { wrapper } from "features";
import { AppType } from "next/dist/next-server/lib/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import "../styles/index.scss";
import socket from "../util/socket";

const App: AppType = ({ Component, pageProps }) => {
  const router = useRouter();
  console.log(process.env.NODE_ENV);

  useEffect(() => {
    socket.on("auth", ({ ...args }) => {
      if (args.error) {
        router.push("/login");
      }
    });

    return () => {
      socket.off("auth");
    };
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tracker</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(App);
