import { Box, Flex, Stack, Text, theme, useColorMode } from "@chakra-ui/react";
import React, { Component } from "react";
import { AiOutlineClose, RiStackFill } from "react-icons/all";
import { Link } from "react-router-dom";

interface INavBar {
  open: boolean;
  auth: boolean;
  username: string;
  role: string;
}

export default class Navbar extends Component<{}, INavBar> {
  constructor(props: any) {
    super(props);
    this.state = {
      auth: false,
      role: "",
      open: false,
      username: "",
    };
  }

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    return (
      <Box
        paddingTop={8}
        paddingBottom={16}
        paddingLeft={["10%"]}
        paddingRight={["10%"]}
      >
        <Nav>
          <NavLogo name="ATAS" />
          <NavToggle open={this.state.open} toggle={this.toggleNav} />
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
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      width="100%"
      marginBottom={4}
      padding={1}
      backgroundColor={
        colorMode === "light" ? theme.colors.gray[200] : theme.colors.gray[500]
      }
      borderRadius={"5px"}
      overflow="hidden"
    >
      {children}
    </Flex>
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
    >
      <Stack
        spacing={[6, 6, 6, 8]}
        align="center"
        justify={["center", "flex-end"]}
        direction={["column", "row"]}
        paddingTop={[4, 0]}
        paddingRight={2}
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
      backgroundColor={colorMode === "light" ? ["", "white"] : ["", "black"]}
      color={colorMode === "light" ? "black" : "white"}
      padding={1}
      width={["250px", "5rem", "7rem"]}
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
  const color = "white";
  return (
    <Box
      display={{ base: "block", sm: "none" }}
      marginRight={5}
      onClick={toggle}
    >
      {open ? <AiOutlineClose color={color} /> : <RiStackFill color={color} />}
    </Box>
  );
};
