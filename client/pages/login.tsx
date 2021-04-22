import { AtSignIcon, LockIcon } from "@chakra-ui/icons";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, Center, Stack, Text } from "@chakra-ui/layout";
import { Button, InputLeftElement, InputRightElement } from "@chakra-ui/react";
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
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data, loading]);

  if (data) return <></>;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    setFetching(true);
    setError("");

    fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200 || result.status === 400)
          return result.json();
        throw new Error("Something went wrong.");
      })
      .then((data) => {
        if (data !== undefined) {
          if (data.error) {
            setError(data.message);
            console.log(data);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
        mutate("/user");
      });
  };

  return (
    <Center>
      <Box
        marginTop="9%"
        marginBottom="25%"
        width={["300px", "450px", "500px"]}
        borderWidth="3px"
        borderRadius="15px"
        borderColor="gray.100"
        borderTopColor="green.500"
        padding="22px"
        boxShadow="2xl"
      >
        <form onSubmit={submit}>
          <Stack direction="column" spacing="15px">
            <Text fontSize="1.8rem" fontWeight="bold" textAlign="center">
              Login
            </Text>
            <InputGroup borderRadius="5px">
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
            <InputGroup borderRadius="5px">
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
                    disabled={fetching ? true : false}
                    height="30px"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                }
              />
            </InputGroup>
            <Text
              fontSize="1.1rem"
              color="red.500"
              display={error.length > 1 ? "flex" : "none"}
            >
              {error}
            </Text>
            <Stack direction="row" justify="flex-end">
              <Button
                disabled={fetching ? true : false}
                type="submit"
                colorScheme="blue"
              >
                Login!
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
