import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import EntryFilter from "../components/entry/EntryFilter";
import EntryModal from "../components/entry/EntryModal";
import EntryTable from "../components/entry/EntryTable";
import Layout from "../components/Layout";
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
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      overflowX="hidden"
    >
      <Navbar />
      <Layout>
        <EntryContextProvider>
          <EntryFilter />
          <EntryModal />
          <Box
            marginTop="22px"
            flexGrow={1}
            overflowX="hidden"
            overflowY="auto"
            borderRadius="5px"
            sx={{
              "&::-webkit-scrollbar": {
                width: "11px",
                borderRadius: "5px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `rgb(197, 197, 197)`,
              },
            }}
          >
            <EntryTable />
          </Box>
        </EntryContextProvider>
      </Layout>
    </Box>
  );
};

export default Home;
