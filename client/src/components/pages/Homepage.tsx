import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { API_DOMAIN } from "../../util/consts";
import AlertList from "../AlertList";
import Navbar from "../Navbar";
import Layout from "./Layout";

interface IHomepage {
  checking: boolean;
  _user?: { username: string; role: "user" | "admin" };
}

export default class Homepage extends Component<{}, IHomepage> {
  constructor(props: any) {
    super(props);
    this.state = {
      checking: true,
    };
  }

  componentDidMount() {
    fetch(`${API_DOMAIN}/user/`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.reqUser) {
          this.setState({ _user: data.reqUser });
        }
      })
      .finally(() => {
        this.setState({ checking: false });
      })
      .catch((err) => console.log(err));
  }

  render() {
    //  Check Auth
    if (this.state.checking) {
      return <>Checking</>;
    }
    //  Authed
    if (this.state._user) {
      return (
        <>
          <Navbar _user={this.state._user} />
          <Layout>
            <AlertList />
          </Layout>
        </>
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
}
