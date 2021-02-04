import React, { Component } from "react";
import { API_DOMAIN } from "../../util/consts";

export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export interface IAuthState {
  checking: boolean;
  authenticated: boolean;
  role: UserRoles;
  login: (username: string, password: string) => Promise<Boolean>;
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
      role: UserRoles.USER,
      login: this.login,
      logout: this.logout,
    };
  }

  componentDidMount() {
    fetch(`${API_DOMAIN}/user/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.reqUser) {
          this.setState({
            authenticated: data.success,
            role: data.reqUser.role,
          });
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

  login = async (username: string, password: string): Promise<Boolean> => {
    const loginResponse = await fetch(`${API_DOMAIN}/user/login`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    }).then((data) => data.json());
    if (loginResponse.success) {
      this.setState({
        authenticated: true,
        role: loginResponse.reqUser.role,
      });
      return true;
    }
    return false;
  };

  logout = () => {
    fetch(`${API_DOMAIN}/user/logout`, { credentials: "include" })
      .catch(() => {
        console.log("Logout Error");
      })
      .finally(() => {
        this.setState({ authenticated: false, role: UserRoles.GUEST });
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
