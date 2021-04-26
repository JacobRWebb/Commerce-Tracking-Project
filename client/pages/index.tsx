import { Box } from "@chakra-ui/layout";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import Content from "../components/Content";
import EntryModal from "../components/entry/EntryModal";
import EntryTable from "../components/entry/EntryTable";
import Filter from "../components/entry/Filter";
import Pagination from "../components/entry/Pagination";
import Navbar from "../components/navbar/Navbar";
import EntryContextProvider from "../context/EntryContext";
import { useUser } from "../util/swrFunctions";

const Home: FunctionComponent = () => {
  const router = useRouter();
  const { data, loading } = useUser();

  useEffect(() => {
    if (!loading && data === undefined) {
      router.push("/login");
    }
  }, [data, loading]);

  if (loading || !data) return <></>;

  return (
    <Box height="100vh" width="100vw" overflowX="hidden">
      <Navbar />
      <Content>
        <EntryContextProvider>
          <Stack direction="column" spacing="22px">
            <Filter />
            <Pagination />
            <EntryTable />
          </Stack>
          <EntryModal />
        </EntryContextProvider>
      </Content>
    </Box>
  );
};

export default Home;
