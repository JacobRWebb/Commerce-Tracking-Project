import { Stack } from "@chakra-ui/layout";
import { FunctionComponent } from "react";
import NavLogo from "./NavLogo";

const Navbar: FunctionComponent = () => {
  return (
    <Stack
      minHeight="50px"
      height={["20vh", "10vh"]}
      maxHeight="60px"
      direction={["column", "row"]}
      justify="space-between"
      paddingLeft="10%"
      paddingRight="10%"
      borderTopColor="green.600"
      borderTopWidth="2px"
      boxShadow="lg"
    >
      <NavLogo title="ATAS" />
    </Stack>
  );
};

export default Navbar;
