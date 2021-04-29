import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Button } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import { Divider, Stack, Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { Textarea } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";
import moment from "moment";
import React, { FunctionComponent, useContext, useState } from "react";
import { mutate } from "swr";
import { EntryContext } from "../../context/EntryContext";
import { AlertStatus } from "../../interface/IEntry";
import { StatusTheme } from "../../util/statusTheme";

const EntryModal: FunctionComponent = () => {
  const context = useContext(EntryContext);
  const [tempComment, setTempComment] = useState("");
  const [tempState, setTempState] = useState<undefined | AlertStatus>(
    undefined
  );

  if (!context) return <></>;
  if (!context.currentEntry) return <></>;

  const entry = context.currentEntry;
  const statusTheme = StatusTheme(entry.status);

  const submit = () => {
    const comment = tempComment.length > 1 ? tempComment : entry.comment;
    const state = tempState !== undefined ? tempState : entry.status;

    context.updateEntry({ comment, status: state, id: entry.id });
  };

  return (
    <Modal
      isOpen={context.currentEntry !== undefined}
      onClose={() => {
        setTempComment("");
        setTempState(undefined);
        mutate("/alert");
        context.viewEntry();
      }}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <Alert
              padding="unset"
              backgroundColor="unset"
              status={statusTheme.type}
              justifyContent="center"
              fontSize="2xl"
            >
              <AlertIcon />
              <Text>Alert {entry.status}</Text>
            </Alert>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction="column" spacing={2}>
              <Divider />
              <Text fontWeight="bold">Application ID:</Text>
              <Text>{entry.application.id}</Text>
              <Divider />
              {entry.user === undefined || entry.user === null ? (
                <></>
              ) : (
                <>
                  <Text fontWeight="bold">
                    Last Changed {moment(entry.updatedAt).fromNow()} By:
                  </Text>
                  <Text>{entry.user.username}</Text>
                  <Divider />
                </>
              )}
              <Text fontWeight="bold">File Path:</Text>
              <Text noOfLines={2} isTruncated={true}>
                {entry.file}
              </Text>
              <Divider />
              <Text fontWeight="bold">Change Agent:</Text>
              <Text noOfLines={2} isTruncated={true}>
                {entry.changeAgent}
              </Text>
              <Divider />
              <Text fontWeight="bold">Change Process:</Text>
              <Text noOfLines={2} isTruncated={true}>
                {entry.changeProcess}
              </Text>
              <Divider />
              <Text fontWeight="bold">Comment:</Text>
              <Editable
                defaultValue={
                  entry.comment === undefined ||
                  entry.comment === null ||
                  entry.comment.length < 1
                    ? ""
                    : entry.comment
                }
                placeholder="Leave a comment!"
                width="100%"
                onSubmit={(value) => setTempComment(value)}
              >
                <Tooltip label="Click To Edit">
                  <EditablePreview
                    padding={1}
                    borderWidth={1}
                    borderRadius={3}
                    _hover={{ borderWidth: 1, borderColor: "black" }}
                    noOfLines={5}
                    minHeight="fit-content"
                  />
                </Tooltip>
                <EditableInput
                  value={entry.comment}
                  onChange={(event) => {}}
                  as={Textarea}
                  minHeight="100px"
                  maxLength={600}
                />
              </Editable>
              <Divider />
              <Text fontWeight="bold">Status:</Text>
              <Stack direction="row">
                <Button
                  colorScheme="green"
                  variant={
                    tempState === undefined
                      ? entry.status === AlertStatus.ACKNOWLEDGED
                        ? "solid"
                        : "outline"
                      : tempState === AlertStatus.ACKNOWLEDGED
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => setTempState(AlertStatus.ACKNOWLEDGED)}
                >
                  {AlertStatus.ACKNOWLEDGED}
                </Button>
                {/* <Button
                  colorScheme="blue"
                  variant={
                    tempState === undefined
                      ? entry.status === AlertStatus.UNACKNOWLEDGED
                        ? "solid"
                        : "outline"
                      : tempState === AlertStatus.UNACKNOWLEDGED
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => setTempState(AlertStatus.UNACKNOWLEDGED)}
                >
                  {AlertStatus.UNACKNOWLEDGED}
                </Button> */}
                <Button
                  colorScheme="red"
                  variant={
                    tempState === undefined
                      ? entry.status === AlertStatus.DECLINED
                        ? "solid"
                        : "outline"
                      : tempState === AlertStatus.DECLINED
                      ? "solid"
                      : "outline"
                  }
                  onClick={() => setTempState(AlertStatus.DECLINED)}
                >
                  {AlertStatus.DECLINED}
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
          <ModalFooter justifyContent="space-between">
            <Text>{moment(entry.timestamp).fromNow()}</Text>
            <Button onClick={() => submit()}>Submit Changes</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default EntryModal;
