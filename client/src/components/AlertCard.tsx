import { Box, theme, useColorMode } from "@chakra-ui/react";
import React from "react";

export interface IAlert {
  id: number;
  name: String;
  status: 1 | 2;
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
      height="160px"
      overflow="hidden"
      fontSize="16px"
      _hover={colorMode === "light" ? { boxShadow: "2xl" } : {}}
      position="relative"
    >
      <Box
        bgColor={
          alert.status === 2 ? theme.colors.green[200] : theme.colors.red[300]
        }
        width="100%"
        height="5px"
      />
    </Box>
  );
};

export default AlertCard;
