import { Text } from "@chakra-ui/layout";
import React, { Component } from "react";
import { AlertContext, AlertState } from "../context";

interface Props {}
interface State {}

export default class TableHeader extends Component<Props, State> {
  static contextType = AlertContext;
  state = {};

  render() {
    const context: AlertState = this.context;
    return (
      <>
        <Text align="center" fontSize={["large", "x-large", "xx-large"]}>
          {context.filter.extended
            ? "Viewing Admin Alert List"
            : "Viewing Alert List"}
        </Text>
      </>
    );
  }
}
