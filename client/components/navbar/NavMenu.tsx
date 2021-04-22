import { Stack } from "@chakra-ui/layout";
import { FunctionComponent } from "react";

const NavMenu: FunctionComponent<{ navOpen: boolean }> = ({
  children,
  navOpen,
}) => {
  return (
    <Stack
      display={[navOpen ? "flex" : "none", "flex"]}
      align="center"
      direction={["column-reverse", "row"]}
      spacing={[1, 3, 6]}
    >
      {children}
    </Stack>
  );
};

export default NavMenu;
