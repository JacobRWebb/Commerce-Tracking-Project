import { Box } from "@chakra-ui/react";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <Box
      className="App"
      backgroundColor="white"
      height="100%"
      minHeight="100vh"
      width="100%"
      minWidth="100%"
      paddingLeft="10%"
      paddingRight="10%"
      marginBottom={10}
    >
      {children}
    </Box>
  );
};

export default Layout;
