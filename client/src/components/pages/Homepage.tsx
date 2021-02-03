import React, { Component } from "react";
import AlertList from "../AlertList";
import Navbar from "../Navbar";
import Layout from "./Layout";

interface IHomepage {}

export default class Homepage extends Component<{}, IHomepage> {
  render() {
    return (
      <>
        <Navbar />
        <Layout>
          <AlertList />
        </Layout>
      </>
    );
  }
}
