import { Box } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import EntryFilter from "../components/entry/EntryFilter";
import EntryModal from "../components/entry/EntryModal";
import EntryTable from "../components/entry/EntryTable";
import { useUser } from "../util/swrFunctions";

const Home: FunctionComponent = () => {
  const { data, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!data && !loading) router.push("/login");
  }, [data, loading]);

  if (!data)
    return (
      <Box paddingTop="1%" paddingLeft="10%" paddingRight="10%">
        <SkeletonText spacing={6} noOfLines={10}>
          Placeholder
        </SkeletonText>
      </Box>
    );

  return (
    <Box padding="1%" paddingLeft="10%" paddingRight="10%">
      <EntryFilter />
      <EntryTable />
      <EntryModal />
    </Box>
  );
};

export default Home;
