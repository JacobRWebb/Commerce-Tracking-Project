import { Box, theme, useColorMode } from "@chakra-ui/react";
import React from "react";

export const Background: React.FC = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      backgroundColor={colorMode === "light" ? "white" : theme.colors.gray[800]}
      backgroundImage={
        colorMode === "light"
          ? "radial-gradient(black 1px, transparent 0)"
          : "radial-gradient(white 1px, transparent 0)"
      }
      backgroundSize={colorMode === "light" ? "25px 25px" : "75px 75px"}
      backgroundPosition="-19px -19px"
      overflowX="hidden"
    >
      {children}
    </Box>
  );
};

const Layout: React.FC = ({ children }) => {
  return (
    <Box paddingBottom={10} padding={9}>
      {children}
    </Box>
  );
};

export default Layout;
