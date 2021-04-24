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
    <>
      <Navbar />
      <EntryContextProvider>
        <Layout>
          <EntryFilter />
          <EntryTable />
          <EntryModal />
        </Layout>
      </EntryContextProvider>
    </>
  );
};

export default Home;
