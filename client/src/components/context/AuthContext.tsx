import React, { Component } from "react";
import { API_DOMAIN } from "../../util/consts";

export interface IAuthState {
  checking: boolean;
  authenticated: boolean;
  setLogin: () => void;
  logout: () => void;
}

const AuthContext = React.createContext({});
export default AuthContext;

export class AuthProvider extends Component<{}, IAuthState> {
  constructor(props: any) {
    super(props);
    this.state = {
      checking: true,
      authenticated: false,
      setLogin: this.setLogin,
      logout: this.logout,
    };
  }

  componentDidMount() {
    fetch(`${API_DOMAIN}/user/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({ authenticated: true });
        }
      })
      .catch((err) => {
        console.log("Auth Context Error");
        console.log(err);
      })
      .finally(() => {
        this.setState({ checking: false });
      });
  }

  setLogin = () => {
    this.setState({ authenticated: true });
  };

  logout = () => {
    fetch(`${API_DOMAIN}/user/logout`, { credentials: "include" })
      .catch(() => {
        console.log("Logout Error");
      })
      .finally(() => {
        this.setState({ authenticated: false });
      });
  };

  render() {
    return (
      <AuthContext.Provider value={{ AuthState: this.state }}>
        {this.state.checking ? <></> : this.props.children}
      </AuthContext.Provider>
    );
  }
}
