import { Box, Stack, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
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

  if (context.entries.length < 1 && !context.loading) {
    return (
      <Box
        backgroundColor={theme.colors.gray[200]}
        padding={2}
        borderRadius={3}
      >
        <Text textAlign="center" fontSize="2xl">
          No results were found. Try changing your filter settings.
        </Text>
      </Box>
    );
  }

  return (
    <Box paddingTop="1%">
      <Stack direction="column" spacing={3}>
        {context.entries.map((entry, index) => (
          <Entry entry={entry} key={entry.id} index={index} />
        ))}
      </Stack>
    </Box>
  );
};

export default EntryTable;
