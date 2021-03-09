import React, { Component } from "react";
import { API_DOMAIN } from "../../util/consts";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

interface Props {}

export interface State {
  checking: boolean;
  auth: boolean;
  role: UserRole;
  update: (auth: boolean, role: UserRole) => void;
}

const initialState: State = {
  checking: true,
  auth: false,
  role: UserRole.GUEST,
  update: (auth: boolean, role: UserRole) => {},
};

export const AuthContext = React.createContext<State>(initialState);

export class Auth extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { ...initialState, update: this.update };
  }

  update = (auth: boolean, role: UserRole) => {
    this.setState({ auth, role });
  };

  componentDidMount() {
    fetch(`${API_DOMAIN}/user/`, { credentials: "include" })
      .then((result) => {
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data && data.user) {
          this.setState({ auth: data.success, role: data.user.role });
        }
      })
      .finally(() => {
        this.setState({ checking: false });
      })
      .catch();
  }

  render() {
    if (this.state.checking) return <></>;
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
