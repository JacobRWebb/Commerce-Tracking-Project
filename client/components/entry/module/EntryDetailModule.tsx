import { FunctionComponent } from "react";
import { IEntry } from "../../../interfaces/IEntryInterfaces";
import EntryMenu from "../EntryMenu";

const EntryDetailModule: FunctionComponent<{ entry: IEntry }> = ({ entry }) => {
  return (
    <EntryMenu>
      <h1 className="font-bold w-full text-center mb-4">
        Full Comprehensive Review
      </h1>
      <div className="flex flex-col md:flex-row text-center md:text-center mb-1 justify-between w-full border-b">
        <p className="font-bold">File</p>
        <p className="break-words">{entry.file}</p>
      </div>
      <div className="flex flex-col md:flex-row text-center md:text-center mb-1 justify-between w-full border-b">
        <p className="font-bold">Hostname</p>
        <p className="break-words">{entry.hostname}</p>
      </div>
      <div className="flex flex-col md:flex-row text-center md:text-center mb-1 justify-between w-full border-b">
        <p className="font-bold">Uploaded</p>
        <p className="break-words">{entry.timestamp}</p>
      </div>
      <div className="flex flex-col md:flex-row text-center md:text-center mb-1 justify-between w-full border-b">
        <p className="font-bold">Change Agent</p>
        <p className="break-words">{entry.changeAgent}</p>
      </div>
      <div className="flex flex-col md:flex-row text-center md:text-center mb-1 justify-between w-full border-b">
        <p className="font-bold">Change Process</p>
        <p className="break-words">{entry.changeProcess}</p>
      </div>
    </EntryMenu>
  );
};

export default EntryDetailModule;
