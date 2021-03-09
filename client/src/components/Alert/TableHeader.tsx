import { Text } from "@chakra-ui/layout";
import React, { Component } from "react";

interface Props {}
interface State {}

export default class TableHeader extends Component<Props, State> {
  state = {};

  render() {
    return (
      <>
        <Text align="center" fontSize={["large", "x-large", "xx-large"]}>
          Viewing Alert List
        </Text>
      </>
    );
  }
}
