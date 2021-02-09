import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Text,
  theme,
  useColorMode,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { IUser } from "../context/AuthContext";

export interface IAlert {
  id: number;
  currentState: 0 | 1;
  file: string;
  timestamp: string;
  comment?: string;
  user?: IUser;
}

interface Props {
  alert: IAlert;
  openModal: (alert: IAlert) => void;
}

const AlertCard: React.FC<Props> = ({ alert, openModal }) => {
  const { colorMode } = useColorMode();

  return (
    <Box
      borderRadius={3}
      boxShadow="lg"
      bgColor={
        colorMode === "light" ? theme.colors.gray[100] : theme.colors.gray[700]
      }
      height="100%"
      overflow="hidden"
      fontSize="16px"
      _hover={colorMode === "light" ? { boxShadow: "2xl" } : {}}
      position="relative"
    >
      <Box
        bgColor={
          alert.currentState === 1
            ? theme.colors.green[200]
            : theme.colors.red[300]
        }
        width="100%"
        height="2px"
      />
      <Wrap padding={2} justify="space-around" textAlign="center">
        {alert.currentState === 1 ? (
          <Text>Acknowledgment Completed</Text>
        ) : (
          <Wrap spacing={[1, 1, 1, 3]} align="center" justify="center">
            <WrapItem>
              <WarningIcon />
            </WrapItem>
            <WrapItem>
              <Text>Acknowledgement Needed</Text>
            </WrapItem>
          </Wrap>
        )}
      </Wrap>
      <Text padding={1} isTruncated>
        File: {alert.file}
      </Text>
      <Wrap
        align="center"
        justify={["center", "space-between"]}
        textAlign="center"
        padding={1}
      >
        <WrapItem>
          <Text textAlign="center">{moment(alert.timestamp).fromNow()}</Text>
        </WrapItem>
        <WrapItem>
          <Button onClick={() => {}} variant="outline" colorScheme="black">
            View
          </Button>
        </WrapItem>
      </Wrap>
    </Box>
  );
};

export default AlertCard;
