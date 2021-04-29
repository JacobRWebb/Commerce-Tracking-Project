import { Box } from "@chakra-ui/layout";
import { FunctionComponent } from "react";

const Content: FunctionComponent = ({ children }) => {
  return <Box margin="77px 10% 22px 10%">{children}</Box>;
};

export default Content;
