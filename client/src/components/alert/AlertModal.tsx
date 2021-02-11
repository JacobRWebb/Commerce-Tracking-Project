import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackItem,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { debounce } from "lodash";
import moment from "moment";
import React, { Component } from "react";
import { API_DOMAIN } from "../../util/consts";
import AuthContext, { IAuthState } from "../context/AuthContext";
import { IAlert } from "./AlertCard";

interface Props {
  alert: IAlert;
  isOpen: boolean;
  onClose: () => void;
}

interface State {
  id: number;
  newState: 0 | 1;
  comment: string;
}

export default class AlertModal extends Component<Props, State> {
  static contextType = AuthContext;

  constructor(props: any) {
    super(props);
    this.state = {
      id: this.props.alert.id,
      newState: 1,
      comment: "",
    };

    this.setComment = debounce(this.setComment, 200);
  }

  setComment = (comment: string) => {
    this.setState({ comment });
  };

  submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { AuthState } = this.context;
    const authState: IAuthState = AuthState;

    fetch(`${API_DOMAIN}/alert/edit/`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status !== 200)
          throw new Error("Server did not respond with 200.");
        return result.json();
      })
      .then((data) => {
        if (!data.success) {
          if (data.auth === undefined) {
            throw new Error("Unable to update.");
          } else {
            authState.logout();
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const alert: IAlert = this.props.alert;

    return (
      <Modal size="lg" isOpen={this.props.isOpen} onClose={this.props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {alert.currentState === 0 ? (
              <Text>Alert is awaiting acknowledgement</Text>
            ) : (
              <>
                <Text>Alert Acknowledged</Text>
              </>
            )}
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Text>ID: {alert.id}</Text>
            {alert.user && (
              <>
                <Text>Approved By: {alert.user?.username}</Text>
                <Text>Comment: {alert.comment}</Text>
              </>
            )}
            <Text>File: {alert.file}</Text>
            <Text>Timestamp: {moment(alert.timestamp).fromNow()}</Text>
          </ModalBody>
          <ModalFooter>
            {this.props.alert.currentState === 0 && (
              <form onSubmit={this.submit} style={{ width: "100%" }}>
                <Stack direction="row" justify="space-between">
                  <StackItem>
                    <Input
                      placeholder="Leave a comment..."
                      onChange={(event) => this.setComment(event.target.value)}
                      isRequired
                    ></Input>
                  </StackItem>
                  <StackItem>
                    <Tooltip hasArrow label="Not Complete">
                      <Button type="submit" colorScheme="green">
                        Verify Alert
                      </Button>
                    </Tooltip>
                  </StackItem>
                </Stack>
              </form>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
