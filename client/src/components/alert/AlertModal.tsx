import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import moment from "moment";
import React, { Component } from "react";
import { IAlert } from "./AlertCard";

interface Props {
  alert: IAlert;
  isOpen: boolean;
  onClose: () => void;
}

interface State {}

export default class AlertModal extends Component<Props, State> {
  state = {};

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
            <Tooltip hasArrow label="Not Complete">
              <Button colorScheme="blue">Edit Alert</Button>
            </Tooltip>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
}
