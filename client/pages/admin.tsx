import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import EntryFilter from "../components/entry/EntryFilter";
import EntryModal from "../components/entry/EntryModal";
import EntryTable from "../components/entry/EntryTable";
import Layout from "../components/Layout";
import Navbar from "../components/navbar/Navbar";
import EntryContextProvider from "../context/EntryContext";
import IRole from "../interface/IRole";
import { useUser } from "../util/swrFunctions";

const Admin: FunctionComponent = () => {
  const router = useRouter();
  const { data, loading } = useUser();

  useEffect(() => {
    if (!loading && data === undefined) {
      router.push("/login");
    }

    if (data.role !== IRole.ADMIN) router.push("/");
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

export default Admin;
