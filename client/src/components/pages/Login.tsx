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

interface ILogin {
  username: string;
  password: string;
  loading: boolean;
  auth: boolean;
}

export default class Login extends Component<{}, ILogin> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loading: false,
      auth: false,
    };
  }

  componentDidMount() {
    fetch(`${API_DOMAIN}/user/`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          this.setState({ auth: true });
        }
      })
      .catch((err) => console.log(err));
  }

  login = () => {
    let { username, password } = this.state;
    // Willingly Ignoring Validation...
    this.setState({ loading: true });
    fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) this.setState({ auth: true });
        else this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  submit = async (event: React.FormEvent) => {
    let { username, password } = this.state;
    // Willingly Ignoring Validation...
    this.setState({ loading: true });
    await fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) this.setState({ auth: true });
        else this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  render() {
    if (this.state.auth) return <Redirect to="/" />;
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
