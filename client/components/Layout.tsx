import { Box } from "@chakra-ui/layout";
import { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      overflowX="hidden"
      margin="22px 10% 22px 10%"
    >
      {children}
    </Box>
  );
};

export default Layout;
