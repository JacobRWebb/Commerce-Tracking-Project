import { Box, ChakraProvider } from "@chakra-ui/react";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Navbar from "./components/Navbar";
import Homepage from "./components/pages/Homepage";
import { Background } from "./components/pages/Layout";
import Login from "./components/pages/Login";
import Toggle from "./components/Toggle";

export default class App extends Component {
  render() {
    return (
      <AuthProvider>
        <ChakraProvider>
          <Background>
            <Box
              className="App"
              overflowX="scroll"
              overflowY="hidden"
              height="100%"
              width="100%"
              minHeight="100vh"
              minWidth="100vw"
            >
              <Router>
                <Navbar />
                <Switch>
                  <Route path="/" exact component={Homepage} />
                  <Route path="/login" component={Login} />
                  <Redirect to="/" />
                </Switch>
              </Router>
              <Toggle />
            </Box>
          </Background>
        </ChakraProvider>
      </AuthProvider>
    );
  }
}
