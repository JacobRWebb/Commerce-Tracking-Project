import { HamburgerIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, Stack, Text, theme, useColorMode } from "@chakra-ui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";

interface INavBar {
  open: boolean;
  auth: boolean;
  username?: string;
  role?: string;
}

export default class Navbar extends Component<{}, INavBar> {
  constructor(props: any) {
    super(props);
    this.state = {
      auth: false,
      open: false,
    };
  }

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <Box
        paddingTop={9}
        paddingBottom={9}
        paddingLeft={["10%"]}
        paddingRight={["10%"]}
      >
        <Nav>
          <Stack width="100%" justify="space-between" direction="row">
            <NavLogo name="ATAS" />
            <NavToggle open={this.state.open} toggle={this.toggleNav} />
          </Stack>
          <NavMenu open={this.state.open}>
            <NavItem to="/">Home</NavItem>
          </NavMenu>
        </Nav>
      </Box>
    );
  }
}

const Nav: React.FC<{}> = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Stack
      as="nav"
      align="center"
      justify="space-between"
      direction={["column", "row"]}
      padding={1}
      backgroundColor={
        colorMode === "light" ? theme.colors.gray[200] : theme.colors.gray[600]
      }
      borderRadius={"5px"}
      overflow="hidden"
    >
      {children}
    </Stack>
  );
};

const NavLogo: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Text
      color="black"
      fontWeight="bold"
      fontSize={["lg", "lg", "x-large", "xx-large"]}
      marginLeft={5}
    >
      {name}
    </Text>
  );
};

const NavMenu: React.FC<{ open: boolean }> = ({ children, open }) => {
  return (
    <Box
      display={{ base: open ? "block" : "none", sm: "block" }}
      flexBasis={{ base: "100%", sm: "auto" }}
      width="100%"
    >
      <Stack
        spacing={6}
        align="center"
        justify={["center", "flex-end"]}
        direction={["column", "row"]}
      >
        {children}
      </Stack>
    </Box>
  );
};

const NavItem: React.FC<{ to: string; logout?: () => void }> = ({
  to = "/",
  logout,
  children,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      borderRadius={2}
      boxShadow={["none", "lg"]}
      backgroundColor={
        colorMode === "light"
          ? [theme.colors.gray[300], "white"]
          : [theme.colors.gray[500], "black"]
      }
      color={colorMode === "light" ? "black" : "white"}
      padding={1}
      marginRight={["", 1, 2, 3]}
      width={["100%", "unset"]}
      textAlign={["center"]}
      onClick={logout !== null ? logout : () => {}}
    >
      <Link to={to}>
        <Text display="block">{children}</Text>
      </Link>
    </Box>
  );
};

const NavToggle: React.FC<{ open: boolean; toggle: () => void }> = ({
  toggle,
  open,
}) => {
  return (
    <Box
      display={{ base: "block", sm: "none" }}
      marginRight={2}
      onClick={toggle}
    >
      {open ? (
        <MinusIcon paddingBottom={1} />
      ) : (
        <HamburgerIcon paddingBottom={1} />
      )}
    </Box>
  );
};
