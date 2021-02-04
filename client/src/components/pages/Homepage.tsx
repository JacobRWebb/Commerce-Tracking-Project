import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AlertList from "../AlertList";
import AuthContext, { IAuthState } from "../context/AuthContext";
import Layout from "./Layout";

export default class Homepage extends Component {
  static contextType = AuthContext;

  render() {
    if (!this.context) return <></>;

    const { AuthState } = this.context;
    const authState: IAuthState = AuthState;

    if (!authState.authenticated) return <Redirect to="/login" />;

    return (
      <>
        <Layout>
          <AlertList />
        </Layout>
      </>
    );
  }
}
