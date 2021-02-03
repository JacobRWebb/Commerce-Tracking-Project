import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_DOMAIN } from "../../util/consts";
import Layout from "./Layout";

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

  render() {
    if (this.state.auth) return <Redirect to="/" />;
    return (
      <Layout>
        <Box
          bgColor="white"
          marginLeft={["5%", "5%", "10%", "20%"]}
          marginRight={["5%", "5%", "10%", "20%"]}
          borderRadius={3}
          boxShadow="dark-lg"
          marginTop="15%"
          minHeight="100%"
          padding={8}
          overflow="hidden"
        >
          <Heading textAlign="center" marginTop={5} marginBottom={10}>
            ATAS Login
          </Heading>
          <FormControl marginTop={3} id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              autoComplete="username"
              readOnly={this.state.loading}
              placeholder="username"
              value={this.state.username}
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
            />
          </FormControl>
          <FormControl marginTop={3} id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              autoComplete="current-password"
              readOnly={this.state.loading}
              placeholder="password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={this.state.loading}
            float="right"
            marginTop={3}
            colorScheme="blue"
            onClick={this.login}
          >
            Login
          </Button>
        </Box>
      </Layout>
    );
  }
}
