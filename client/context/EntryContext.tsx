import { debounce } from "lodash";
import React, { Component } from "react";
import IEntry, { AlertStatus } from "../interface/IEntry";
import IFilter from "../interface/IFilter";
import { API_DOMAIN } from "../util/constants";

export interface IEntryContext {
  currentEntry?: IEntry;
  viewEntry: (id?: string) => void;
  entries: IEntry[];
  count: number;
  loading: boolean;
  fetchEntries: () => void;
  filter: IFilter;
  filterOpen: boolean;
  setFilterOpen: (state?: boolean) => void;
  updateFilter: (newFilter: Partial<IFilter>) => void;
  updateEntry: (newEntry: Partial<IEntry>) => void;
}

const defaultEntryContext: IEntryContext = {
  currentEntry: undefined,
  viewEntry: (id?: string) => {},
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
  updateEntry: () => {},
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
      updateFilter: debounce(this.updateFilter, 50),
      updateEntry: this.updateEntry,
    };
  }

  setFilterOpen = (state?: boolean) => {
    if (state) this.setState({ filterOpen: state });
    else this.setState({ filterOpen: !this.state.filterOpen });
  };

  updateFilter = (newFilter: Partial<IFilter>) => {
    if (!newFilter.page) {
      newFilter.page = 1;
    }
    newFilter.offset = (newFilter.page - 1) * this.state.filter.take;

    this.setState((prevState) => {
      return {
        filter: {
          ...prevState.filter,
          ...newFilter,
        },
      };
    }, this.fetchEntries);
  };

  updateEntry = (newEntry: Partial<IEntry>) => {
    fetch(`${API_DOMAIN}/alert/update`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(newEntry),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data !== undefined) {
          this.fetchEntries();
          this.viewEntry(newEntry.id);
        }
      })
      .catch(() => {});
  };

  viewEntry = (id?: string) => {
    if (id === undefined) {
      this.setState({ currentEntry: undefined });
      return;
    }

    fetch(`${API_DOMAIN}/alert/get`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data !== undefined) {
          this.setState({ currentEntry: data.entry });
        }
      })
      .catch(() => {});
  };

  fetchEntries = () => {
    let filter: IFilter = this.state.filter;

    if (!filter.page) {
      filter.page = 1;
    }

    filter.offset = (filter.page - 1) * filter.take;

    fetch(`${API_DOMAIN}/alert`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(filter),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200) return result.json();
      })
      .then((data) => {
        if (data) {
          this.setState((prevState) => {
            return {
              entries: data.alerts,
              count: data.count,
              filter: {
                ...prevState.filter,
                extended: filter.extended,
              },
            };
          });
        }
      })
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
