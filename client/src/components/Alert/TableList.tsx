import { Stack } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import React, { Component } from "react";
import { AlertContext, AlertState } from "../context";
import Entry, { IEntry } from "./Entry";

interface Props {}
interface State {
  entries: IEntry[];
}

export default class TableList extends Component<Props, State> {
  static contextType = AlertContext;
  constructor(props: any, context: AlertState) {
    super(props);
    this.state = {
      entries: context.entries,
    };
  }

  componentDidUpdate() {
    const context: AlertState = this.context;
    if (this.state.entries !== context.entries)
      this.setState({ entries: context.entries });
  }

  shouldComponentUpdate(prevProps: Props, prevState: State) {
    const context: AlertState = this.context;
    if (prevState.entries !== context.entries) return true;
    return false;
  }

  render() {
    const context: AlertState = this.context;
    return (
      <div>
        <SkeletonText
          spacing={6}
          noOfLines={10}
          isLoaded={context.entries.length > 0}
        />
        <Stack direction="column" spacing={2}>
          {context.entries.map((entry, index) => {
            return <Entry key={entry.id} index={index} entry={entry} />;
          })}
        </Stack>
      </div>
    );
  }
}
