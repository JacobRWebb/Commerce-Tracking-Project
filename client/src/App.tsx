import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar/Navbar";
import { Homepage, Login, Logout } from "./components/pages";
import PrivateRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Layout>
        <Switch>
          <PrivateRoute component={Homepage} exact path="/" />
          <PrivateRoute component={Homepage} path="/admin" />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
