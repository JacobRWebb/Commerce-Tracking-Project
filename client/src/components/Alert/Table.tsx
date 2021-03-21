import { Stack } from "@chakra-ui/layout";
import React, { Component } from "react";
import EntryModal from "./EntryModal";
import TableHeader from "./TableHeader";
import TableList from "./TableList";
import TableOptions from "./TableOptions";

interface Props {}
interface State {}

export default class Table extends Component<Props, State> {
  render() {
    return (
      <Stack direction="column" marginTop={5}>
        <TableHeader />
        <TableOptions />
        <TableList />
        <EntryModal />
      </Stack>
    );
  }
}
