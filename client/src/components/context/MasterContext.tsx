import { Text } from "@chakra-ui/layout";
import { debounce } from "lodash";
import React, { Component } from "react";
import { API_DOMAIN } from "../../util/consts";
import { AlertStatus, IEntry } from "../Alert/Entry";
import { Filter } from "../Alert/TableOptions";

export enum Role {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

interface AuthState {
  auth: boolean;
  role: Role;
  checkAuth: () => Promise<boolean>;
}

interface AlertState {
  entries: IEntry[];
  currentEntry: IEntry | undefined;
  tempComment: string;
  tempState: AlertStatus | undefined;
  isFetching: boolean;
  internalFetch: boolean;
  rows: number;
  filter: Filter;
  fetchEntries: () => void;
  changeEntry: (entryID: string | undefined) => Promise<void>;
  editEntry: (editEntry: Partial<IEntry>) => void;
  updateFilter: (newFilter: Partial<Filter>) => void;
  saveEntry: () => void;
}

interface Props {}
export interface MasterState {
  isFetching: boolean;
  down: boolean;
  AuthState: AuthState;
  AlertState: AlertState;
  startReCheck: () => void;
  updateAuthState: (newState: Partial<AuthState>) => void;
  updateAlertState: (newState: Partial<AlertState>) => void;
  debounceAlertState: (newState: Partial<AlertState>) => void;
}

const defaultContext: MasterState = {
  isFetching: true,
  down: false,
  AuthState: {
    auth: false,
    role: Role.GUEST,
    checkAuth: async () => {
      return false;
    },
  },
  AlertState: {
    entries: [],
    currentEntry: undefined,
    tempComment: "",
    tempState: undefined,
    isFetching: true,
    internalFetch: false,
    rows: 0,
    filter: {
      time: "DESC",
      status: AlertStatus.ALL,
      extended: false,
      offset: 0,
      take: 25,
      hostname: "",
      applicationID: "",
      page: 1,
    },
    fetchEntries: () => {},
    changeEntry: async () => {},
    editEntry: () => {},
    updateFilter: (newFilter: Partial<Filter>) => {},
    saveEntry: () => {},
  },
  startReCheck: () => {},
  updateAuthState: (newState: Partial<AuthState>) => {},
  updateAlertState: (newState: Partial<AlertState>) => {},
  debounceAlertState: (newState: Partial<AlertState>) => {},
};

export const _MasterContext = React.createContext<MasterState>(defaultContext);

export default class MasterContext extends Component<Props, MasterState> {
  recheck: NodeJS.Timeout | undefined;

  constructor(props: Props) {
    super(props);
    this.state = {
      ...defaultContext,
      startReCheck: this.startReCheck,
      updateAuthState: this.updateAuthState,
      updateAlertState: this.updateAlertState,
      debounceAlertState: debounce(this.debounceAlertState, 100),
      AuthState: {
        ...defaultContext.AuthState,
        checkAuth: this.checkAuth,
      },
      AlertState: {
        ...defaultContext.AlertState,
        fetchEntries: this.fetchEntries,
        changeEntry: this.changeEntry,
        updateFilter: this.updateFilter,
        saveEntry: this.saveEntry,
      },
    };
  }

  componentDidMount() {
    this.internalCheck();
  }

  componentWillUnmount() {
    if (this.recheck !== undefined) clearTimeout(this.recheck);
  }

  internalCheck = () => {
    console.log("Internal Check");
    let tempState: Partial<MasterState> = {};
    let tempAuth: Partial<AuthState> = {};

    fetch(`${API_DOMAIN}/user/`, {
      credentials: "include",
    })
      .then((result) => {
        if (result.status === 200) return result.json();
        tempAuth.auth = false;
      })
      .then((data) => {
        if (!data) return;

        if (data.user) {
          tempAuth.auth = true;
          tempAuth.role = data.user.role;
        }
      })
      .catch((err) => {
        tempState.down = true;
      })
      .finally(() => {
        tempState.isFetching = false;

        this.setState(
          (prevState) => {
            return {
              ...prevState,
              ...tempState,
              AuthState: {
                ...prevState.AuthState,
                ...tempAuth,
              },
            };
          },
          () => {
            if (this.state.down) {
              this.startReCheck();
            }
          }
        );
      });
  };

  startReCheck = () => {
    this.recheck = setTimeout(this.internalCheck, 2000);
  };

  checkAuth = async (): Promise<boolean> => {
    return false;
  };

  changeEntry = async (entryID: string | undefined) => {
    if (entryID === undefined) {
      this.setState((prevState) => {
        return {
          AlertState: {
            ...prevState.AlertState,
            currentEntry: undefined,
          },
        };
      });
      return;
    }

    fetch(`${API_DOMAIN}/alert/get`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ alertId: entryID }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
        if (result.status === 401) {
          this.setState((prevState) => {
            return {
              AuthState: {
                ...prevState.AuthState,
                auth: false,
                role: Role.GUEST,
              },
            };
          });
          return;
        }
      })
      .then((data) => {
        if (!data) return;
        if (data.alert) {
          this.setState((prevState) => {
            return {
              AlertState: {
                ...prevState.AlertState,
                currentEntry: data.alert,
              },
            };
          });
        }
      })
      .catch(() => {
        this.setState({ down: true }, () => this.internalCheck());
      });
  };

  editEntry = (newEntry: Partial<IEntry> | undefined) => {};

  fetchEntries = () => {
    if (this.state.AlertState.internalFetch) return;
    this.setState((prevState) => {
      return { AlertState: { ...prevState.AlertState, internalFetch: true } };
    });
    fetch(`${API_DOMAIN}/alert/`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(this.state.AlertState.filter),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
        if (result.status === 401) {
          this.setState((prevState) => {
            return {
              AuthState: {
                ...prevState.AuthState,
                auth: false,
                role: Role.GUEST,
              },
            };
          });
        }
      })
      .then((data) => {
        if (!data) return;
        if (data.alerts) {
          this.setState((prevState) => {
            return {
              AlertState: {
                ...prevState.AlertState,
                isFetching: false,
                rows: data.count,
                entries: data.alerts,
              },
            };
          });
        }
      })
      .finally(() => {
        this.setState((prevState) => {
          return {
            AlertState: { ...prevState.AlertState, internalFetch: false },
          };
        });
      })
      .catch(() => {
        this.setState({ down: true }, () => this.internalCheck());
      });
  };

  updateFilter = (newFilter: Partial<Filter>) => {
    if (!newFilter.page) {
      newFilter.page = 1;
      newFilter.offset = 0;
    }
    this.setState(
      (prevState) => {
        return {
          AlertState: {
            ...prevState.AlertState,
            filter: {
              ...prevState.AlertState.filter,
              ...newFilter,
            },
          },
        };
      },
      () => this.fetchEntries()
    );
  };

  saveEntry = async (): Promise<boolean> => {
    let pass = false;
    let comment: string = this.state.AlertState.currentEntry?.comment || "";
    if (this.state.AlertState.tempComment)
      comment = this.state.AlertState.tempComment;

    let state: AlertStatus =
      this.state.AlertState.tempState ||
      this.state.AlertState.currentEntry?.status ||
      AlertStatus.UNACKNOWLEDGED;

    const response = await fetch(`${API_DOMAIN}/alert/update`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        alertID: this.state.AlertState.currentEntry?.id,
        comment: comment,
        status: state,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      pass = true;
      this.fetchEntries();
      this.changeEntry(this.state.AlertState.currentEntry?.id);
      return pass;
    } else if (response.status === 401) {
      this.updateAuthState({ auth: false, role: Role.GUEST });
      return pass;
    }

    return pass;
  };

  updateAlertState = (newState: Partial<AlertState>) => {
    this.setState((prevState) => {
      return {
        AlertState: {
          ...prevState.AlertState,
          ...newState,
        },
      };
    });
  };

  debounceAlertState = (newState: Partial<AlertState>) => {
    this.setState((prevState) => {
      return {
        AlertState: {
          ...prevState.AlertState,
          ...newState,
        },
      };
    });
  };

  updateAuthState = (newState: Partial<AuthState>) => {
    this.setState((prevState) => {
      return {
        AuthState: {
          ...prevState.AuthState,
          ...newState,
        },
      };
    });
  };

  render() {
    if (this.state.isFetching) return <></>;
    if (this.state.down)
      return (
        <>
          <Text>API Server is Down.</Text>
        </>
      );
    return (
      <_MasterContext.Provider value={this.state}>
        {this.props.children}
      </_MasterContext.Provider>
    );
  }
}
