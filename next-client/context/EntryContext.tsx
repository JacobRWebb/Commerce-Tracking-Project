import React, { Component } from "react";
import IEntry, { AlertStatus } from "../interface/IEntry";
import IFilter from "../interface/IFilter";
import { API_DOMAIN } from "../util/constants";

export interface IEntryContext {
  viewingEntry?: IEntry;
  viewEntry: (entry?: IEntry) => void;
  entries: IEntry[];
  count: number;
  loading: boolean;
  fetchEntries: () => void;
  filter: IFilter;
  filterOpen: boolean;
  setFilterOpen: (state?: boolean) => void;
  updateFilter: (newFilter: Partial<IFilter>) => void;
}

const defaultEntryContext: IEntryContext = {
  viewingEntry: undefined,
  viewEntry: () => {},
  entries: [],
  count: 0,
  loading: true,
  fetchEntries: () => {},
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
  filterOpen: false,
  setFilterOpen: (state?: boolean) => {},
  updateFilter: () => {},
};

export const EntryContext = React.createContext<IEntryContext>(
  defaultEntryContext
);

export default class EntryContextProvider extends Component<{}, IEntryContext> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...defaultEntryContext,
      viewEntry: this.viewEntry,
      fetchEntries: this.fetchEntries,
      setFilterOpen: this.setFilterOpen,
      updateFilter: this.updateFilter,
    };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  setFilterOpen = (state?: boolean) => {
    if (state) this.setState({ filterOpen: state });
    else this.setState({ filterOpen: !this.state.filterOpen });
  };

  updateFilter = (newFilter: Partial<IFilter>) => {
    this.setState((prevState) => {
      return {
        filter: {
          ...prevState.filter,
          ...newFilter,
        },
      };
    }, this.fetchEntries);
  };

  viewEntry = (entry?: IEntry) => {
    if (entry === undefined) {
      this.setState({ viewingEntry: undefined });
      return;
    }
    this.setState({ viewingEntry: entry });
  };

  fetchEntries = () => {
    this.setState({ loading: true });
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
        if (data) {
          this.setState({ entries: data.alerts, count: data.count });
        }
      })
      .finally(() => this.setState({ loading: false }))
      .catch(() => {});
  };

  render() {
    return (
      <EntryContext.Provider value={this.state}>
        {this.props.children}
      </EntryContext.Provider>
    );
  }
}
