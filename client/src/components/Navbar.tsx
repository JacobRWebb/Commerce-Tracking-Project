import { HamburgerIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Stack,
  Text,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext, { IAuthState } from "./context/AuthContext";

interface INavBar {
  open: boolean;
}

export default class Navbar extends Component<{}, INavBar> {
  static contextType = AuthContext;

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };
  }

  toggleNav = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { AuthState } = this.context;
    const authState: IAuthState = AuthState;

    return (
      <Box
        paddingTop={9}
        paddingBottom={1}
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
            {authState.authenticated && (
              <NavItem onClick={authState.logout}>Logout</NavItem>
            )}
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

const NavItem: React.FC<{ onClick?: () => void; to?: string }> = ({
  children,
  onClick,
  to = "/",
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
      marginRight={["", 1, 2, 3]}
      width={["100%", "unset"]}
    >
      {to !== null ? (
        <Button
          paddingTop={1}
          paddingRight={[1, 3, 5]}
          paddingLeft={[1, 3, 5]}
          paddingBottom={1}
          variant="link"
          display="block"
          onClick={onClick !== null ? onClick : undefined}
          textAlign={["center"]}
          as={Link}
          to={to}
        >
          {children}
        </Button>
      ) : (
        <Button
          paddingTop={1}
          paddingRight={[1, 3, 5]}
          paddingLeft={[1, 3, 5]}
          paddingBottom={1}
          variant="link"
          display="block"
          onClick={onClick !== null ? onClick : undefined}
          textAlign={["center"]}
        >
          {children}
        </Button>
      )}
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
