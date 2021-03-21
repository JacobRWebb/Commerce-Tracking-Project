import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Divider, Stack, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import React, { Component } from "react";
import { MasterState, _MasterContext } from "../context/MasterContext";
import { AlertStatus, IEntry, statusTheme } from "./Entry";

interface Props {}
interface State {}

export default class EntryModal extends Component<Props, State> {
  static contextType = _MasterContext;

  close = () => {
    const context: MasterState = this.context;
    context.AlertState.changeEntry(undefined);
    context.updateAlertState({ tempComment: "", tempState: undefined });
  };

  render() {
    const context: MasterState = this.context;
    if (context.AlertState.currentEntry === undefined) return <></>;
    const Entry: IEntry = context.AlertState.currentEntry;
    const sTheme = statusTheme(Entry.status);
    return (
      <Modal
        isOpen={context.AlertState.currentEntry === undefined ? false : true}
        onClose={() => this.close()}
      >
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <Alert
                padding="unset"
                backgroundColor="unset"
                status={sTheme.type}
                fontSize="2xl"
                justifyContent="center"
              >
                <AlertIcon />
                <Text>Alert {Entry.status}</Text>
              </Alert>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack direction="column" spacing={2}>
                <Divider />
                <Text fontWeight="bold">Application ID:</Text>
                <Text>{Entry.application.id}</Text>
                <Divider />
                {Entry.user === undefined || Entry.user === null ? (
                  <></>
                ) : (
                  <>
                    <Text fontWeight="bold">
                      Last Changed {moment(Entry.updatedAt).fromNow()} By:
                    </Text>
                    <Text>{Entry.user.username}</Text>
                    <Divider />
                  </>
                )}
                <Text fontWeight="bold">File Path:</Text>
                <Text noOfLines={2} isTruncated={true}>
                  {Entry.file}
                </Text>
                <Divider />
                <Text fontWeight="bold">Change Agent:</Text>
                <Text noOfLines={2} isTruncated={true}>
                  {Entry.changeAgent}
                </Text>
                <Divider />
                <Text fontWeight="bold">Change Process:</Text>
                <Text noOfLines={2} isTruncated={true}>
                  {Entry.changeProcess}
                </Text>
                <Divider />
                <Text fontWeight="bold">Comment:</Text>
                <Tooltip label="Click To Edit">
                  <Editable
                    defaultValue={
                      Entry.comment === undefined ||
                      Entry.comment === null ||
                      Entry.comment.length < 1
                        ? "Leave a comment"
                        : Entry.comment
                    }
                    width="100%"
                    onSubmit={(value) => this.setState({ comment: value })}
                  >
                    <EditablePreview
                      padding={1}
                      borderWidth={1}
                      borderRadius={3}
                      _hover={{ borderWidth: 1, borderColor: "black" }}
                      noOfLines={5}
                      isTruncated={true}
                    />
                    <EditableInput
                      value={Entry.comment}
                      onChange={(event) =>
                        context.debounceAlertState({
                          tempComment: event.target.value,
                        })
                      }
                      as={Textarea}
                    />
                  </Editable>
                </Tooltip>
                <Divider />
                <Text fontWeight="bold">Status</Text>
                <Stack direction="row">
                  <Button
                    colorScheme="green"
                    variant={
                      context.AlertState.tempState === undefined
                        ? Entry.status === AlertStatus.ACKNOWLEDGED
                          ? "solid"
                          : "outline"
                        : context.AlertState.tempState ===
                          AlertStatus.ACKNOWLEDGED
                        ? "solid"
                        : "outline"
                    }
                    onClick={() =>
                      context.debounceAlertState({
                        tempState: AlertStatus.ACKNOWLEDGED,
                      })
                    }
                  >
                    {AlertStatus.ACKNOWLEDGED}
                  </Button>
                  <Button
                    colorScheme="red"
                    variant={
                      context.AlertState.tempState === undefined
                        ? Entry.status === AlertStatus.DECLINED
                          ? "solid"
                          : "outline"
                        : context.AlertState.tempState === AlertStatus.DECLINED
                        ? "solid"
                        : "outline"
                    }
                    onClick={() =>
                      context.debounceAlertState({
                        tempState: AlertStatus.DECLINED,
                      })
                    }
                  >
                    {AlertStatus.DECLINED}
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant={
                      context.AlertState.tempState === undefined
                        ? Entry.status === AlertStatus.UNACKNOWLEDGED
                          ? "solid"
                          : "outline"
                        : context.AlertState.tempState ===
                          AlertStatus.UNACKNOWLEDGED
                        ? "solid"
                        : "outline"
                    }
                    onClick={() =>
                      context.debounceAlertState({
                        tempState: AlertStatus.UNACKNOWLEDGED,
                      })
                    }
                  >
                    {AlertStatus.UNACKNOWLEDGED}
                  </Button>
                </Stack>
                <Divider />
                <Stack direction="row-reverse">
                  <Button
                    onClick={() => {
                      context.AlertState.saveEntry();
                    }}
                  >
                    Submit Edit
                  </Button>
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    );
  }
}
