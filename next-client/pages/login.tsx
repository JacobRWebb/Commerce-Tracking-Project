import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, Center, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  InputLeftElement,
  InputRightElement,
  Tooltip,
} from "@chakra-ui/react";
import theme from "@chakra-ui/theme";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { mutate } from "swr";
import { API_DOMAIN } from "../util/constants";
import { useUser } from "../util/swrFunctions";

const Login: FunctionComponent = () => {
  const { data, loading } = useUser();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data && !loading) {
      router.push("/");
    }
  }, [data, loading]);

  const submit = (event: React.FormEvent) => {
    //  @TODO // Client side validation.

    event.preventDefault();
    setFetching(true);

    fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
        throw new Error("Something went wrong.");
      })
      .then((data) => {
        mutate("/user");
        setFetching(false);
      })
      .catch((error) => {
        setFetching(false);
      });
  };

  return (
    <Center>
      <form onSubmit={submit}>
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
                disabled={fetching}
                value={username}
                type="username"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color={theme.colors.gray[400]} />}
              />
              <Input
                autoComplete="password"
                disabled={fetching}
                value={password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  disabled={fetching}
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Stack direction="row-reverse">
              <Button variant="link">
                <Tooltip label="Not implemented">Forgot Password?</Tooltip>
              </Button>
            </Stack>
            <Button disabled={fetching} colorScheme="blue" type="submit">
              Login
            </Button>
          </Stack>
        </Box>
      </form>
    </Center>
  );
};

export default Login;
