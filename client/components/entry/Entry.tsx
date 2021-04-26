import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Stack, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import moment from "moment";
import { FunctionComponent, useContext } from "react";
import { mutate } from "swr";
import { EntryContext } from "../../context/EntryContext";
import IEntry from "../../interface/IEntry";
import { StatusTheme } from "../../util/statusTheme";
import Container from "../Container";

const Entry: FunctionComponent<{ entry: IEntry; index: number }> = ({
  entry,
  index,
}) => {
  const context = useContext(EntryContext);

  if (!context)
    return (
      <>
        <p>Context ERROR</p>
      </>
    );

  const statusTheme = StatusTheme(entry.status);

  return (
    <Container
      align="center"
      backgroundColor={index % 2 === 0 ? "gray.300" : "gray.100"}
      direction="row"
      justify="space-between"
      overflow="hidden"
      borderColor="transparent"
      borderLeftColor={statusTheme.borderColor}
      padding={2}
      _hover={{
        borderRightColor: theme.colors.gray[500],
      }}
    >
      <Stack direction="column" width={[200, 200, 320]}>
        <Alert
          padding="unset"
          backgroundColor="unset"
          status={statusTheme.type}
        >
          <AlertIcon />
          <Text>{entry.status}</Text>
        </Alert>
        <Text noOfLines={3} overflowWrap="break-word">
          File Path: {entry.file}
        </Text>
      </Stack>
      <Stack
        display={["none", "unset"]}
        direction="column"
        width={[0, 130, 180, 200]}
        overflow="hidden"
      >
        <Text noOfLines={2}>Application ID: {entry.application.id}</Text>
        <Text noOfLines={2}>Hostname: {entry.hostname}</Text>
      </Stack>
      <Stack
        display={["none", "none", "none", "unset"]}
        direction="column"
        width={[0, 0, 0, 300]}
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
      <Button
        colorScheme="blue"
        onClick={() => {
          mutate("/user");
          context.viewEntry(entry.id);
        }}
      >
        Edit
      </Button>
    </Container>
  );
};

export default Entry;
