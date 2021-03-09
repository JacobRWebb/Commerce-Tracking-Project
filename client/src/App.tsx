import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import { Homepage, Login, Logout } from "./components/pages";
import PrivateRoute from "./components/ProtectedRoute";

export default class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/">
              <Homepage />
            </PrivateRoute>
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}
