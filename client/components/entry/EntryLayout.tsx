import { Stack } from "@chakra-ui/react";
import React, { FunctionComponent } from "react";
import EntryContextProvider from "../../context/EntryContext";
import EntryModal from "./EntryModal";
import EntryTable from "./EntryTable";
import Filter from "./Filter";
import Pagination from "./Pagination";

const EntryLayout: FunctionComponent = () => {
  return (
    <EntryContextProvider>
      <Stack direction="column" spacing="22px">
        <Filter />
        <Pagination />
        <EntryTable />
      </Stack>
      <EntryModal />
    </EntryContextProvider>
  );
};

export default EntryLayout;
