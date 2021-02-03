import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_DOMAIN } from "../../util/consts";

export default class Logout extends Component<{}, { loggingOut: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      loggingOut: true,
    };
  }
  componentDidMount() {
    fetch(`${API_DOMAIN}/user/logout`, { credentials: "include" })
      .finally(() => {
        this.setState({ loggingOut: false });
      })
      .catch(() => {
        console.log("Something went wrong somehow.");
      });
  }

  render() {
    if (this.state.loggingOut) return <></>;
    else return <Redirect to="/" />;
  }
}
