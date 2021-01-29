import React, { Component } from "react";
import AlertList from "../AlertList";
import Layout from "./Layout";

interface IHomepage {}

export default class Homepage extends Component<{}, IHomepage> {
  render() {
    return (
      <Layout>
        <AlertList />
      </Layout>
    );
  }
}
