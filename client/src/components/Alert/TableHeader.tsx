import { Text } from "@chakra-ui/layout";
import React, { Component } from "react";
import { MasterState, _MasterContext } from "../context/MasterContext";

interface Props {}
interface State {}

export default class TableHeader extends Component<Props, State> {
  static contextType = _MasterContext;
  state = {};

  render() {
    const context: MasterState = this.context;
    return (
      <>
        <Text align="center" fontSize={["large", "x-large", "xx-large"]}>
          {context.AlertState.filter.extended
            ? "Viewing Admin Alert List"
            : "Viewing Alert List"}
        </Text>
      </>
    );
  }
}
