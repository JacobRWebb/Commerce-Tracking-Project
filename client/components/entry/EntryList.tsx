import { RootState } from "features";
import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import Entry from "./Entry";

const EntryList: FunctionComponent = () => {
  const entriesState = useSelector((state: RootState) => state.entries);

  return (
    <div className="entryList scroll rounded mb-2">
      {entriesState.entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryList;
