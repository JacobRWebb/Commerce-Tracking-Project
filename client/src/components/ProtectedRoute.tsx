import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "./context";

const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const context = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={({ location }) =>
        context.auth ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
