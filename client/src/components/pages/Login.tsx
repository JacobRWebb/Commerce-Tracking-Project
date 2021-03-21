import { Button } from "@chakra-ui/button";
import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { Box, Center, Stack, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import { Tooltip } from "@chakra-ui/tooltip";
import React, { Component } from "react";
import { Redirect } from "react-router";
import { API_DOMAIN } from "../../util/consts";
import { MasterState, _MasterContext } from "../context/MasterContext";

interface Props {}

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
}

export default class Login extends Component<Props, State> {
  static contextType = _MasterContext;

  constructor(props: any) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showPassword: false,
      loading: false,
    };
  }

  submit = () => {
    const context: MasterState = this.context;
    this.setState({ loading: true });

    let { username, password } = this.state;
    fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.role) {
          this.setState({ loading: false }, () => {
            context.updateAuthState({ auth: true, role: data.role });
          });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const context: MasterState = this.context;
    if (context.AuthState.auth) return <Redirect to="/" />;

    return (
      <Center>
        <Box
          marginTop="10%"
          width={["300px", "500px"]}
          borderWidth={3}
          borderColor={theme.colors.gray[100]}
          borderTopColor={theme.colors.green[500]}
          padding={2}
          boxShadow="2xl"
        >
          <Stack direction="column" spacing={3}>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Login
            </Text>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AtSignIcon color={theme.colors.gray[400]} />}
              />
              <Input
                autoComplete="username"
                disabled={this.state.loading}
                value={this.state.username}
                type="username"
                placeholder="Username"
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color={theme.colors.gray[400]} />}
              />
              <Input
                autoComplete="password"
                disabled={this.state.loading}
                value={this.state.password}
                type={this.state.showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
              <InputRightElement width="4.5rem">
                <Button
                  disabled={this.state.loading}
                  h="1.75rem"
                  size="sm"
                  onClick={() =>
                    this.setState({ showPassword: !this.state.showPassword })
                  }
                >
                  {this.state.showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Stack direction="row-reverse">
              <Button variant="link">
                <Tooltip label="Not implemented">Forgot Password?</Tooltip>
              </Button>
            </Stack>
            <Button
              disabled={this.state.loading}
              colorScheme="blue"
              type="submit"
              onClick={() => this.submit()}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Center>
    );
  }
}
