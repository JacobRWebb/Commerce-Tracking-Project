import { WarningIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Stack,
  Text,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

export interface IAlert {
  id: number;
  currentState: 0 | 1;
  file: string;
  timeStamp: string;
}

const AlertCard: React.FC<{ alert: IAlert }> = ({ alert }) => {
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
      <Box padding={1} textAlign="center">
        {alert.currentState === 1 ? (
          <Text>Acknowledgement Completed</Text>
        ) : (
          <Stack direction="row" spacing={1} justify="center">
            <Text>
              <WarningIcon marginRight={2} />
              Acknowledgement Needed
            </Text>
          </Stack>
        )}
        <Text isTruncated>{alert.file}</Text>
      </Box>
      <Stack direction={["column", "row"]} justify="space-between" padding={2}>
        <Text textAlign="center">{moment(alert.timeStamp).fromNow()}</Text>
        <Link to={`/alert/${alert.id}`}>
          <Button variant="outline" colorScheme="black">
            View
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

export default AlertCard;
