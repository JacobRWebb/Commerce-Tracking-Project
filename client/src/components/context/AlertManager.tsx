import React, { Component } from "react";
import { API_DOMAIN } from "../../util/consts";
import { AlertStatus, IEntry } from "../Alert/Entry";

interface Filter {
  time: "ASC" | "DESC";
  status: AlertStatus;
  extended: boolean;
  offset: number;
  take: number;
  hostname: string;
  page: number;
}

interface Props {}
export interface State {
  entries: IEntry[];
  modalViewing: IEntry | undefined;
  checking: boolean;
  rowCount: number;
  filter: Filter;
  updateFilter: (newFilter: Partial<Filter>) => void;
  changeModalViewing: (newView: string | undefined) => void;
  fetchAlerts: () => void;
}

let initialState: State = {
  entries: [],
  modalViewing: undefined,
  checking: true,
  rowCount: 0,
  filter: {
    time: "DESC",
    status: AlertStatus.ALL,
    extended: false,
    offset: 0,
    take: 25,
    hostname: "",
    page: 1,
  },
  updateFilter: (newFilter: Partial<Filter>) => {},
  changeModalViewing: (newView: string | undefined) => {},
  fetchAlerts: () => {},
};

export const AlertContext = React.createContext<State>(initialState);

export class AlertManager extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ...initialState,
      updateFilter: this.updateFilter,
      changeModalViewing: this.changeModalViewing,
      fetchAlerts: this.fetchAlerts,
    };
  }

  componentDidMount() {
    this.fetchAlerts();
  }

  changeModalViewing = async (newView: string | undefined) => {
    if (newView === undefined)
      return this.setState({ modalViewing: undefined });
    fetch(`${API_DOMAIN}/alert/get`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ alertId: newView }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data.success) {
          this.setState({ modalViewing: data.alert });
        }
      })
      .catch(() => {
        //  Uh ohh.
      });
  };

  updateFilter = (newFilter: Partial<Filter>) => {
    if (!newFilter.page) {
      newFilter.page = 1;
      newFilter.offset = 0;
    }
    this.setState((prevState) => {
      return {
        filter: {
          ...prevState.filter,
          ...newFilter,
        },
      };
    }, this.fetchAlerts);
  };

  fetchAlerts = () => {
    fetch(`${API_DOMAIN}/alert`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(this.state.filter),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data.success) {
          this.setState({ rowCount: data.count, entries: data.alerts });
        }
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        this.setState({ checking: false });
      });
  };

  render() {
    return (
      <AlertContext.Provider value={this.state}>
        {this.props.children}
      </AlertContext.Provider>
    );
  }
}
