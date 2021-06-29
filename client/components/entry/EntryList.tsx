import { FunctionComponent } from "react";
import { IEntry } from "../../context/EntryContext";
import Entry from "./Entry";

const EntryList: FunctionComponent<{ entries: IEntry[] }> = ({ entries }) => {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntryList;
