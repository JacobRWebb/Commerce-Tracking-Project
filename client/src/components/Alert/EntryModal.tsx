import { Alert, AlertIcon } from "@chakra-ui/alert";
import {
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Text,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import React, { Component } from "react";
import { AlertContext, AlertState } from "../context";
import { AlertStatus, IEntry, statusTheme } from "./Entry";

interface Props {}
interface State {
  newComment: string;
  newState: AlertStatus;
}

export default class EntryModal extends Component<Props, State> {
  static contextType = AlertContext;

  constructor(props: any) {
    super(props);
    this.state = {
      newComment: "",
      newState: AlertStatus.UNACKNOWLEDGED,
    };
  }

  submit = () => {
    const context: AlertState = this.context;
    const { newComment, newState } = this.state;
  };

  render() {
    const context: AlertState = this.context;
    const entry: IEntry | undefined = context.modalViewing;
    if (entry === undefined) return <></>;
    if (this.state.newState !== entry.status)
      this.setState({ newState: entry.status });
    const sTheme = statusTheme(entry.status);
    return (
      <>
        <Modal
          isOpen={context.modalViewing === undefined ? false : true}
          onClose={() => context.changeModalViewing(undefined)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Alert
                padding="unset"
                backgroundColor="unset"
                status={sTheme.type}
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
                {entry.user === null || entry.user === undefined ? (
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
                <Tooltip label="Double Click To Edit">
                  <Editable
                    defaultValue={
                      entry.comment === undefined || entry.comment === null
                        ? "Leave a comment"
                        : `${entry.comment}`
                    }
                    width="100%"
                    onSubmit={() => {
                      console.log("Comment");
                    }}
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
                      value={this.state.newComment}
                      onChange={(event) =>
                        this.setState({ newComment: event.target.value })
                      }
                      as={Textarea}
                    />
                  </Editable>
                </Tooltip>
                <Divider />
                <Text fontWeight="bold">Status</Text>
                <Select onChange={(event) => {}}>
                  <option value={AlertStatus.ACKNOWLEDGED}>
                    {AlertStatus.ACKNOWLEDGED}
                  </option>
                  <option value={AlertStatus.UNACKNOWLEDGED}>
                    {AlertStatus.UNACKNOWLEDGED}
                  </option>
                  <option value={AlertStatus.DECLINED}>
                    {AlertStatus.DECLINED}
                  </option>
                </Select>
                <Divider />
                <Stack direction="row-reverse">
                  <Tooltip label="Not implemented">
                    <Button>Submit Change</Button>
                  </Tooltip>
                </Stack>
              </Stack>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
}
