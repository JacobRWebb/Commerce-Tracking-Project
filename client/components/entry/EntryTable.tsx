import { Box, Stack, Text } from "@chakra-ui/layout";
import { FunctionComponent, useContext, useEffect } from "react";
import { EntryContext } from "../../context/EntryContext";
import { useUser } from "../../util/swrFunctions";
import Entry from "./Entry";

const EntryTable: FunctionComponent = () => {
  const context = useContext(EntryContext);
  const { data, loading } = useUser();

  useEffect(() => {
    if (context) {
      if (data && !loading) {
        context.fetchEntries();
      }
    }
  }, [data, loading]);

  if (loading || !data) return <></>;

  if (context.entries.length < 1 && !context.loading) {
    return (
      <Box
        boxShadow="lg"
        backgroundColor="gray.200"
        padding="22px"
        borderRadius="5px"
      >
        <Text textAlign="center" fontSize="2xl">
          No Results were found, Try changing your filter settings.
        </Text>
      </Box>
    );
  }

  return (
    <Stack direction="column" spacing="22px">
      {context.entries.map((entry, index) => (
        <Entry key={entry.id} index={index} entry={entry} />
      ))}
    </Stack>
  );
};

export default EntryTable;
