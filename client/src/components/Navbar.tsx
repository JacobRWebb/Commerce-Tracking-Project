import { HamburgerIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, Stack, StackProps, Text, theme } from "@chakra-ui/react";
import React, { Component } from "react";
import { Link, LinkProps } from "react-router-dom";
import { AuthContext, AuthState, UserRole } from "./context";

interface Props {}
interface State {
  collapse: boolean;
}

export default class NavbarComposition extends Component<Props, State> {
  static contextType = AuthContext;

  constructor(props: any, context: AuthState) {
    super(props);

    this.state = {
      collapse: true,
    };
  }

  toggleNav = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const context: AuthState = this.context;
    return (
      <Navbar>
        <NavContainer direction={"row"}>
          <NavLogo title="ATAS" />
          <NavToggle collapse={this.state.collapse} toggle={this.toggleNav} />
        </NavContainer>
        <NavContainer collapse={this.state.collapse} justify="flex-end">
          <NavButton to="/" title="Home" />
          {context.auth ? (
            <>
              {context.role === UserRole.ADMIN ? (
                <NavButton to="/admin" title="Admin ( Not implemented )" />
              ) : (
                <></>
              )}
              <NavButton to="/logout" title="Logout" />
            </>
          ) : (
            <></>
          )}
        </NavContainer>
      </Navbar>
    );
  }
}

const Navbar: React.FC = ({ children }) => {
  return (
    <Stack
      as="nav"
      align="center"
      justify="space-between"
      direction={["column", "row"]}
      width="100%"
      marginTop={5}
      marginBottom={5}
      padding={2}
      backgroundColor={theme.colors.gray[300]}
      borderRadius={3}
    >
      {children}
    </Stack>
  );
};

const NavContainer: React.FC<{ collapse?: boolean } & StackProps> = ({
  children,
  collapse = false,
  ...props
}) => {
  return (
    <Stack
      display={[collapse ? "none" : "flex", "flex"]}
      justify="space-between"
      align="center"
      direction={["column", "row"]}
      width="100%"
      {...props}
    >
      {children}
    </Stack>
  );
};

const NavLogo: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Text
      color="black"
      fontWeight="bold"
      fontSize={["lg", "x-large", "xx-large"]}
    >
      {title}
    </Text>
  );
};

const NavToggle: React.FC<{ collapse: boolean; toggle: () => void }> = ({
  collapse,
  toggle,
}) => {
  return (
    <Stack
      align="center"
      justifyContent="space-between"
      visibility={["unset", "hidden"]}
      onClick={toggle}
      style={{ userSelect: "none" }}
    >
      {collapse ? (
        <HamburgerIcon
          height="100%"
          _hover={{ cursor: "pointer" }}
          alignmentBaseline="middle"
        />
      ) : (
        <MinusIcon
          height="100%"
          _hover={{ cursor: "pointer" }}
          alignmentBaseline="middle"
        />
      )}
    </Stack>
  );
};

const NavButton: React.FC<{ title?: string } & LinkProps> = ({
  children,
  title = "",
  ...props
}) => {
  return (
    <Link {...props}>
      <Button marginLeft={[0, 3]}>{title}</Button>
    </Link>
  );
};
