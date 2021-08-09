import FilterModal from "components/filter/FilterModal";
import { FunctionComponent } from "react";
import EntryFilter from "./EntryFilter";
import EntryList from "./EntryList";

const EntryContainer: FunctionComponent = () => {
  return (
    <div className="flex flex-col overflow-hidden w-full">
      <EntryFilter />
      <FilterModal />
      <EntryList />
    </div>
  );
};

export default EntryContainer;
