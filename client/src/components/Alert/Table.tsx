import { Stack } from "@chakra-ui/layout";
import React, { Component } from "react";
import { AlertManager } from "../context";
import TableHeader from "./TableHeader";
import TableList from "./TableList";
import TableOptions from "./TableOptions";

interface Props {}
interface State {}

export default class Table extends Component<Props, State> {
  render() {
    return (
      <AlertManager>
        <Stack direction="column" marginTop={5}>
          <TableHeader />
          <TableOptions />
          <TableList />
        </Stack>
      </AlertManager>
    );
  }
}
