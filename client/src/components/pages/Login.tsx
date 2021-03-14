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
import { AuthContext, AuthState } from "../context";

// interface Props extends RouteProps {}

// interface State {
//   username: string;
//   password: string;
//   loading: boolean;
//   redirect: boolean;
// }

// export default class Login extends Component<Props, State> {
//   static contextType = AuthContext;

//   constructor(props: any, context: AuthState) {
//     super(props);

//     this.state = {
//       username: "",
//       password: "",
//       loading: false,
//       redirect: false,
//     };
//   }

//   submit = async (event: React.FormEvent) => {
//     const context: AuthState = this.context;

//     event.preventDefault();

//     let { username, password } = this.state;
//     fetch(`${API_DOMAIN}/user/login`, {
//       credentials: "include",
//       method: "POST",
//       body: JSON.stringify({ username, password }),
//       headers: { "Content-Type": "application/json" },
//     })
//       .then((result) => {
//         if (result.status === 403) return this.setState({ redirect: true });
//         if (result.status === 200) return result.json();
//       })
//       .then((data) => {
//         if (data.success && data.role) {
//           context.update(data.success, data.role);
//         }
//       })
//       .catch(() => {});
//   };

//   render() {
//     const context: AuthState = this.context;
//     if (this.state.redirect || context.auth) return <Redirect to="/" />;
//     return (
//       <LoginLayout submit={this.submit}>
//         <Heading textAlign="center" color="black" marginBottom={10}>
//           ATAS Login
//         </Heading>
//         <FormControl marginTop={3} id="username" isRequired>
//           <FormLabel color="black">Username</FormLabel>
//           <Input
//             color="black"
//             isRequired
//             autoComplete="username"
//             readOnly={this.state.loading}
//             placeholder="username"
//             value={this.state.username}
//             onChange={(event) =>
//               this.setState({ username: event.target.value })
//             }
//           />
//         </FormControl>
//         <FormControl marginTop={3} marginBottom={3} id="password" isRequired>
//           <FormLabel color="black">Password</FormLabel>
//           <Input
//             color="black"
//             autoComplete="current-password"
//             readOnly={this.state.loading}
//             placeholder="password"
//             value={this.state.password}
//             onChange={(event) =>
//               this.setState({ password: event.target.value })
//             }
//             type="password"
//             isRequired
//           />
//         </FormControl>
//         <Button
//           value="solid"
//           color="black"
//           type="submit"
//           isLoading={this.state.loading}
//         >
//           Login
//         </Button>
//       </LoginLayout>
//     );
//   }
// }

// const LoginLayout: React.FC<{
//   submit: (event: React.FormEvent) => Promise<void>;
// }> = ({ children, submit }) => {
//   const { colorMode } = useColorMode();
//   return (
//     <Box
//       position="fixed"
//       top="50%"
//       left="50%"
//       marginRight="-50%"
//       transform="translate(-50%, -50%)"
//       backgroundColor={colorMode === "light" ? "white" : theme.colors.gray[200]}
//       borderRadius={3}
//       boxShadow="lg"
//       padding={[5, 10]}
//     >
//       <form onSubmit={submit}>{children}</form>
//     </Box>
//   );
// };

interface Props {}

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  loading: boolean;
  reload: boolean;
}

export default class Test extends Component<Props, State> {
  static contextType = AuthContext;

  constructor(props: any, context: AuthState) {
    super(props);

    this.state = {
      username: "",
      password: "",
      showPassword: false,
      loading: false,
      reload: false,
    };
  }

  submit = (event: React.FormEvent) => {
    const context: AuthState = this.context;
    event.preventDefault();
    this.setState({ loading: true });
    let { username, password } = this.state;
    fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 403) return this.setState({ reload: true });
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data.success && data.role) {
          context.update(data.success, data.role);
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    const context: AuthState = this.context;
    if (context.auth) return <Redirect to="/" />;
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
          <form onSubmit={this.submit}>
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
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Center>
    );
  }
}
