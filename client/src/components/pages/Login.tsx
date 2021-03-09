import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_DOMAIN } from "../../util/consts";
import { AuthContext, AuthState } from "../context";

interface ILogin {
  username: string;
  password: string;
  loading: boolean;
  redirect: boolean;
}

export default class Login extends Component<{}, ILogin> {
  static contextType = AuthContext;

  constructor(props: any, context: AuthState) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
      redirect: false,
    };
  }

  submit = async (event: React.FormEvent) => {
    const context: AuthState = this.context;

    event.preventDefault();

    let { username, password } = this.state;
    fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 403) return this.setState({ redirect: true });
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data.success && data.role) {
          context.update(data.success, data.role);
        }
      })
      .catch(() => {});
  };

  render() {
    const context: AuthState = this.context;
    if (this.state.redirect || context.auth) return <Redirect to="/" />;
    return (
      <LoginLayout submit={this.submit}>
        <Heading textAlign="center" color="black" marginBottom={10}>
          ATAS Login
        </Heading>
        <FormControl marginTop={3} id="username" isRequired>
          <FormLabel color="black">Username</FormLabel>
          <Input
            color="black"
            isRequired
            autoComplete="username"
            readOnly={this.state.loading}
            placeholder="username"
            value={this.state.username}
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
          />
        </FormControl>
        <FormControl marginTop={3} marginBottom={3} id="password" isRequired>
          <FormLabel color="black">Password</FormLabel>
          <Input
            color="black"
            autoComplete="current-password"
            readOnly={this.state.loading}
            placeholder="password"
            value={this.state.password}
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
            type="password"
            isRequired
          />
        </FormControl>
        <Button
          value="solid"
          color="black"
          type="submit"
          isLoading={this.state.loading}
        >
          Login
        </Button>
      </LoginLayout>
    );
  }
}

const LoginLayout: React.FC<{
  submit: (event: React.FormEvent) => Promise<void>;
}> = ({ children, submit }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      position="fixed"
      top="50%"
      left="50%"
      marginRight="-50%"
      transform="translate(-50%, -50%)"
      backgroundColor={colorMode === "light" ? "white" : theme.colors.gray[200]}
      borderRadius={3}
      boxShadow="lg"
      padding={[5, 10]}
    >
      <form onSubmit={submit}>{children}</form>
    </Box>
  );
};
