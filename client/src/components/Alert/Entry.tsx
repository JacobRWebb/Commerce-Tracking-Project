import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Stack,
  Text,
  theme,
} from "@chakra-ui/react";
import moment from "moment";
import React, { Component } from "react";

export enum AlertStatus {
  ALL = "all",
  ACKNOWLEDGED = "acknowledged",
  UNACKNOWLEDGED = "un-acknowledged",
  DECLINED = "declined",
}

export interface IEntry {
  id: string;
  status: AlertStatus;
  application: {
    id: string;
    name: string;
  };
  timestamp: string;
  user?: { id: string; username: string; role: string };
  comment?: string;
  hostname: string;
  file: string;
  changeAgent: string;
  changeProcess: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  index: number;
  entry: IEntry;
  changeModal: (newView: string | undefined) => void;
}
interface State {}

export default class Entry extends Component<Props, State> {
  render() {
    const entry = this.props.entry;
    const sTheme = statusTheme(entry.status);

    return (
      <Box
        backgroundColor={
          this.props.index % 2 !== 0 ? "white" : theme.colors.gray[200]
        }
        borderLeftColor={sTheme.borderColor}
        borderLeftWidth={5}
        borderRightWidth={3}
        borderRightColor="transparent"
        borderRadius={3}
        padding={2}
        _hover={{
          borderRightColor: theme.colors.gray[300],
        }}
      >
        <Stack align="center" direction="row" justify="space-between">
          <Stack direction="column" width={[200, 200, 300]} overflow="hidden">
            <Alert padding="unset" backgroundColor="unset" status={sTheme.type}>
              <AlertIcon />
              <Text>{entry.status}</Text>
            </Alert>
            <Text isTruncated={true} noOfLines={5}>
              File Path: {entry.file}
            </Text>
          </Stack>
          <Stack
            display={["none", "none", "none", "unset"]}
            direction="column"
            width={[200, 200, 300]}
            overflow="hidden"
          >
            <Text isTruncated={true}>
              Application ID: {entry.application.id}
            </Text>
            <Text isTruncated={true}>Hostname: {entry.hostname}</Text>
          </Stack>
          <Stack
            display={["none", "unset"]}
            direction="column"
            width={[200, 200, 300]}
            overflow="hidden"
          >
            <Text isTruncated={true}>
              Submitted: {moment(entry.timestamp).fromNow()}
            </Text>
            {entry.user ? (
              <Text isTruncated={true}>
                Last change by - {entry.user.username}
              </Text>
            ) : (
              <></>
            )}
          </Stack>
          <Button
            border="2px"
            borderColor="green.500"
            onClick={() => this.props.changeModal(entry.id)}
          >
            Edit
          </Button>
        </Stack>
      </Box>
    );
  }
}

interface IStatusTheme {
  borderColor: string;
  type: "info" | "warning" | "success" | "error";
}

export const statusTheme = (status: AlertStatus | undefined): IStatusTheme => {
  if (status === undefined)
    return { type: "info", borderColor: theme.colors.red[100] };
  switch (status) {
    case AlertStatus.ACKNOWLEDGED:
      return { borderColor: theme.colors.green[200], type: "success" };
    case AlertStatus.DECLINED:
      return { borderColor: theme.colors.red[200], type: "error" };
    default:
      return { borderColor: theme.colors.blue[200], type: "info" };
  }
};
