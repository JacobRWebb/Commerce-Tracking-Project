import { FunctionComponent, useContext } from "react";
import { EntryContext } from "../../context/EntryContext";
import EntryFilter from "./EntryFilter";
import EntryList from "./EntryList";

const EntryContainer: FunctionComponent = () => {
  const entryContext = useContext(EntryContext);
  return (
    <div className="entry-container">
      <EntryFilter />
      <EntryList entries={entryContext.entries} />
    </div>
  );
};

export default EntryContainer;
