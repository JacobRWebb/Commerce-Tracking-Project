import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_DOMAIN } from "../../util/consts";
import { MasterState, Role, _MasterContext } from "../context/MasterContext";

export default class Logout extends Component {
  static contextType = _MasterContext;

  componentDidMount() {
    const context: MasterState = this.context;

    fetch(`${API_DOMAIN}/user/logout`, { credentials: "include" })
      .finally(() => {
        context.updateAuthState({ auth: false, role: Role.GUEST });
      })
      .catch(() => {
        context.startReCheck();
      });
  }

  render() {
    return <Redirect to="/login" />;
  }
}
