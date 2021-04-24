import { Box } from "@chakra-ui/layout";
import { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => {
  return <Box margin="1% 10% 1% 10%">{children}</Box>;
};

export default Layout;
