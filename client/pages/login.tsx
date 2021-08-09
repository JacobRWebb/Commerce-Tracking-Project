import { actionCreators, RootState, wrapper } from "features";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import Form from "../components/form/Form";
import FormButton from "../components/form/FormButton";
import FormHeader from "../components/form/FormHeader";
import FormSubHeader from "../components/form/FormSubHeader";
import InputField from "../components/form/InputField";
import Layout from "../components/Layout";

const Login: FunctionComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators.AuthActions, dispatch);
  const auth = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (auth.user) {
      router.push("/");
    }
  }, [auth.user]);

  const submitLogin = (event: React.FormEvent) => {
    event.preventDefault();
    login({ username, password });
  };

  return (
    <Layout>
      <Form formFunc={submitLogin} error={auth.error ? true : false}>
        <FormHeader value="Login" />
        <FormSubHeader value="Access Content and Manage Alerts." />
        <InputField
          icon={<AiOutlineUser />}
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={({ currentTarget }) => setUsername(currentTarget.value)}
          disabled={auth.fetching}
        />
        <InputField
          icon={<AiOutlineLock />}
          placeholder="Password"
          autoComplete="password"
          type="password"
          value={password}
          onChange={({ currentTarget }) => setPassword(currentTarget.value)}
          disabled={auth.fetching}
        />
        {auth.error ? (
          <p key="error">{`${auth.error.param}: ${auth.error.msg}`}</p>
        ) : (
          <p></p>
        )}
        <FormButton disabled={auth.fetching}>Login</FormButton>
      </Form>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      let token = req.cookies.token;
      await store.dispatch(actionCreators.AuthActions.checkToken({ token }));
      let state: RootState = store.getState();
      if (state.auth.user === null) {
        return {
          props: {},
        };
      }

      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
);

export default Login;
