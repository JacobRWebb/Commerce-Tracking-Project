import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import EntryTable from "../components/entry/EntryTable";
import { useUser } from "../util/swrFunctions";

const Home: FunctionComponent = () => {
  const { data, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!data && !loading) router.push("/login");
  }, [data, loading]);

  if (!data) return <></>;

  return (
    <Box paddingTop="1%">
      <EntryTable />
    </Box>
  );
};

export default Home;
