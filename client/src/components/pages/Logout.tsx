import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_DOMAIN } from "../../util/consts";
import { AuthContext, AuthState, UserRole } from "../context";

export default class Logout extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const context: AuthState = this.context;

    fetch(`${API_DOMAIN}/user/logout`, { credentials: "include" })
      .finally(() => {
        context.update(false, UserRole.GUEST);
      })
      .catch(() => {
        //
      });
  }

  render() {
    return <Redirect to="/login" />;
  }
}
