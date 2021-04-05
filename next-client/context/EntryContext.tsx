import React, { Component } from "react";
import { mutate } from "swr";
import { AlertStatus } from "../interface/IEntry";
import IFilter from "../interface/IFilter";

export interface IEntryContext {
  filter: IFilter;
  updateFilter: (newFilter: Partial<IFilter>) => void;
}

const defaultEntryContext: IEntryContext = {
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
      updateFilter: this.updateFilter,
    };
  }

  updateFilter = (newFilter: Partial<IFilter>) => {
    this.setState((prevState) => {
      return {
        filter: {
          ...prevState.filter,
          ...newFilter,
        },
      };
    });

    mutate("/alert");
  };

  render() {
    return (
      <EntryContext.Provider value={this.state}>
        {this.props.children}
      </EntryContext.Provider>
    );
  }
}
