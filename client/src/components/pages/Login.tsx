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
import AuthContext, { IAuthState } from "../context/AuthContext";

interface ILogin {
  username: string;
  password: string;
  loading: boolean;
}

export default class Login extends Component<{}, ILogin> {
  static contextType = AuthContext;

  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }

  submit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { AuthState } = this.context;
    const authState: IAuthState = AuthState;
    let { username, password } = this.state;

    const res = await authState.login(username, password);
    if (!res) {
      this.setState({ loading: false });
    }
  };

  render() {
    const { AuthState } = this.context;
    const authState: IAuthState = AuthState;

    if (authState.authenticated) return <Redirect to="*" />;
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
