import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { FunctionComponent, useContext, useEffect } from "react";
import EntryFilter from "../components/entry/EntryFilter";
import EntryModal from "../components/entry/EntryModal";
import EntryTable from "../components/entry/EntryTable";
import { EntryContext } from "../context/EntryContext";
import IRole from "../interface/IRole";
import { useUser } from "../util/swrFunctions";

const Admin: FunctionComponent = () => {
  const context = useContext(EntryContext);
  const { data, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!data) {
      router.push("/login");
      return;
    }

    if (data.role !== IRole.ADMIN) {
      router.push("/login");
      return;
    }
  }, [data, loading]);

  if (loading) {
    return <></>;
  }

  return (
    <Box padding="1%" paddingLeft="10%" paddingRight="10%">
      <EntryFilter />
      <EntryTable />
      <EntryModal />
    </Box>
  );
};

export default Admin;
