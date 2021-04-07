import { Box, Stack, Text } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import theme from "@chakra-ui/theme";
import { FunctionComponent, useContext } from "react";
import { EntryContext } from "../../context/EntryContext";
import Entry from "./Entry";

const EntryTable: FunctionComponent = () => {
  const context = useContext(EntryContext);

  if (!context) return <></>;

  if (context.loading) {
    return (
      <SkeletonText spacing={6} noOfLines={10}>
        Placeholder
      </SkeletonText>
    );
  }

  if (context.entries.length < 1) {
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
