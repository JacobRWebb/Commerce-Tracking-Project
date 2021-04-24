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

  if (!context) return <></>;

  return (
    <Box borderRadius="5px">
      {context.entries.length < 1 && !context.loading ? (
        <Box backgroundColor="gray.200" padding="22px" borderRadius="5px">
          <Text textAlign="center" fontSize="2xl">
            No Results were found, Try changing your filter settings.
          </Text>
        </Box>
      ) : (
        <Stack direction="column" spacing={3}>
          {context.entries.map((entry, index) => (
            <Entry entry={entry} key={entry.id} index={index} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default EntryTable;
