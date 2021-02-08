import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AlertList from "../AlertList";
import AuthContext, { IAuthState, UserRoles } from "../context/AuthContext";
import Layout from "./Layout";

export default class AdminPage extends Component {
  static contextType = AuthContext;

  render() {
    if (!this.context) return <></>;

    const { AuthState } = this.context;
    const authState: IAuthState = AuthState;
    if (authState.role !== UserRoles.ADMIN) return <Redirect to="/" />;

    return (
      <>
        <Layout>
          <AlertList extended />
        </Layout>
      </>
    );
  }
}
