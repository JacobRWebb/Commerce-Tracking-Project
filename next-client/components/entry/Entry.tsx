import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Stack, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import moment from "moment";
import { FunctionComponent } from "react";
import IEntry from "../../interface/IEntry";
import { StatusTheme } from "../../util/statusTheme";

const Entry: FunctionComponent<{ entry: IEntry; index: number }> = ({
  entry,
  index,
}) => {
  const statusTheme = StatusTheme(entry.status);

  return (
    <Stack
      align="center"
      backgroundColor={index % 2 === 0 ? "gray.300" : "gray.100"}
      direction="row"
      spacing={0}
      justify="space-between"
      overflow="hidden"
      borderRadius={3}
      borderWidth={3}
      borderColor="transparent"
      borderLeftColor={statusTheme.borderColor}
      padding={2}
      _hover={{
        borderRightColor: theme.colors.gray[500],
      }}
    >
      <Stack direction="column" width={[200, 200, 300]}>
        <Alert
          padding="unset"
          backgroundColor="unset"
          status={statusTheme.type}
        >
          <AlertIcon />
          <Text>{entry.status}</Text>
        </Alert>
        <Text isTruncated>File Path: {entry.file}</Text>
      </Stack>
      <Stack
        display={["none", "unset"]}
        direction="column"
        width={[150, 180]}
        overflow="hidden"
      >
        <Text isTruncated={true}>Application ID: {entry.application.id}</Text>
        <Text isTruncated={true}>Hostname: {entry.hostname}</Text>
      </Stack>
      <Stack
        display={["none", "none", "none", "unset"]}
        direction="column"
        width={[200, 250]}
        overflow="hidden"
      >
        <Text isTruncated={true}>
          Submitted: {moment(entry.timestamp).fromNow()}
        </Text>
        {entry.user ? (
          <Text isTruncated={true}>Last change by - {entry.user.username}</Text>
        ) : (
          <></>
        )}
      </Stack>
      <Button colorScheme="blue">Edit</Button>
    </Stack>
  );
};

export default Entry;
