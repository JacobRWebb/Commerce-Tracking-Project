import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, Link, Stack, Text } from "@chakra-ui/layout";
import { Button, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { mutate } from "swr";
import Container from "../components/Container";
import { API_DOMAIN } from "../util/constants";
import { useUser } from "../util/swrFunctions";

const Login: FunctionComponent = () => {
  const router = useRouter();
  const { data, loading } = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    if (!loading && data !== undefined) {
      router.push("/");
    }
  }, [data, loading]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    setFetching(true);
    setError(undefined);

    fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200 || result.status === 400)
          return result.json();
        throw new Error("Something went wrong, please try again!");
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.error) {
            throw new Error(data.error);
          } else if (data.user) {
            mutate("/user");
          } else {
            throw new Error("Unexpected Response, Please Retry!");
          }
        }
      })
      .catch((error: Error) => {
        setError(error.message);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  return (
    <Box width="100vw" height="100vh">
      <Container
        padding="0px 0px 11px 0px"
        spacing="11px"
        minWidth="320px"
        maxWidth="600px"
        width="45%"
        position="absolute"
        top="30%"
        left="50%"
        transform="translate(-50%, -50%);"
        overflow="hidden"
        boxShadow="2xl"
        as="form"
        onSubmit={submit}
      >
        <Text
          padding="11px 0px 11px 0px"
          fontWeight="bold"
          fontSize="1.8rem"
          textAlign="center"
          backgroundColor="green.500"
          color="white"
        >
          ATAS Login
        </Text>
        <Stack spacing="11px" direction="column" padding="0px 11px 0px 11px">
          <InputGroup>
            <InputLeftElement children={<AtSignIcon color="gray.400" />} />
            <Input
              required
              name="username"
              placeholder="Username"
              value={username}
              type="text"
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              disabled={fetching ? true : false}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement children={<LockIcon color="gray.400" />} />
            <Input
              required
              name="password"
              placeholder="Password"
              value={password}
              type={showPassword ? "text" : "password"}
              autoComplete="password"
              onChange={(event) => setPassword(event.target.value)}
              disabled={fetching ? true : false}
            />
            <InputRightElement
              width="50px"
              marginRight="10px"
              children={
                <Button
                  backgroundColor="gray.600"
                  color="white"
                  disabled={fetching ? true : false}
                  height="30px"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  _hover={{
                    backgroundColor: "gray.500",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              }
            />
          </InputGroup>
          {error !== undefined ? (
            <Text fontSize="1.1rem" color="red.500">
              {error}
            </Text>
          ) : (
            <></>
          )}
        </Stack>
        <Stack
          direction="column"
          align="flex-end"
          spacing="11px"
          padding="0px 11px 0px 11px"
        >
          <Link>Forgot your password?</Link>
          <Button
            colorScheme="blue"
            type="submit"
            width="100px"
            disabled={fetching ? true : false}
          >
            Login!
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
