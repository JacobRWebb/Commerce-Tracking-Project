import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/router";
import React, { FunctionComponent, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import Layout from "../components/Layout";
import { API_DOMAIN } from "../util/constants";

const Login: FunctionComponent = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fetching, setFetching] = useState(false);

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    setFetching(true);
    fetch(`${API_DOMAIN}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((result) => {
        if (result.status === 200 || result.status === 404) {
          return result.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          if (data.token) {
            router.push("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  return (
    <Layout>
      <div className="auth">
        <form className="auth-form" onSubmit={login}>
          <h1>Login</h1>
          <div>
            <p>Don't have an account?</p>
            <a>Sign up</a>
          </div>
          <input
            className="auth-input"
            placeholder="Username"
            autoComplete="username"
            type="text"
            value={username}
            onChange={({ currentTarget }) => setUsername(currentTarget.value)}
            disabled={fetching}
          />
          <input
            className="auth-input"
            placeholder="Password"
            autoComplete="password"
            type="password"
            value={password}
            onChange={({ currentTarget }) => setPassword(currentTarget.value)}
            disabled={fetching}
          />
          <button className="auth-submit" type="submit" disabled={fetching}>
            Login
            <BsArrowRight />
          </button>
        </form>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> => {
  const data = await fetch(`${API_DOMAIN}/user/check`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: req.cookies.token || "" }),
  }).then((result) => {
    if (result.status === 200 || result.status === 404) {
      return result.json();
    }
  });

  if (data) {
    if (!data.info) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default Login;
