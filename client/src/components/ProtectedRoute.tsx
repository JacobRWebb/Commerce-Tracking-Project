import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "./context";

const PrivateRoute: React.FC<RouteProps> = ({ component, ...routeProps }) => {
  const context = useContext(AuthContext);
  if (context.auth) return <Route {...routeProps} component={component} />;
  return (
    <Redirect
      to={{ pathname: "/login", state: { from: window.location.pathname } }}
    />
  );
};

export default PrivateRoute;
