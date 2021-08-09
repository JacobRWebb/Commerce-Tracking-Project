import { FunctionComponent } from "react";
import EntryMenu from "../EntryMenu";

const EntryStatusModule: FunctionComponent = () => {
  return (
    <EntryMenu>
      <div className="flex flex-row p-5 items-center justify-between bg-white rounded">
        <p>Change Status</p>

        <button>Status</button>
      </div>
    </EntryMenu>
  );
};

export default EntryStatusModule;
