import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { _MasterContext } from "./context/MasterContext";

const PrivateRoute: React.FC<RouteProps> = ({ component, ...routeProps }) => {
  const context = useContext(_MasterContext);
  if (context.AuthState.auth)
    return <Route {...routeProps} component={component} />;
  return (
    <Redirect
      to={{ pathname: "/login", state: { from: window.location.pathname } }}
    />
  );
};

export default PrivateRoute;
