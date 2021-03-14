import { Box } from "@chakra-ui/react";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <Box className="App" paddingLeft="10%" paddingRight="10%" flexGrow={1}>
      {children}
    </Box>
  );
};

export default Layout;
