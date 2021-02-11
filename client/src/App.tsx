import { ChakraProvider } from "@chakra-ui/react";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Navbar from "./components/Navbar";
import AdminPage from "./components/pages/AdminPage";
import Homepage from "./components/pages/Homepage";
import { Background } from "./components/pages/Layout";
import Login from "./components/pages/Login";
import Toggle from "./components/Toggle";

export default class App extends Component {
  render() {
    return (
      <ChakraProvider>
        <Background>
          <AuthProvider>
            <Router>
              <Navbar />
              <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/admin" component={AdminPage} />
                <Route path="/login" component={Login} />
                <Redirect to="/" />
              </Switch>
            </Router>
            <Toggle />
          </AuthProvider>
        </Background>
      </ChakraProvider>
    );
  }
}
