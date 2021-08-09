import { actionCreators } from "features";
import { FunctionComponent } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { IEntry } from "../../interfaces/IEntryInterfaces";
import StatusIndiciator from "../StatusIndicator";

const Glance: FunctionComponent<{ entry: IEntry }> = ({ entry }) => {
  const dispatch = useDispatch();

  const { openEntry } = bindActionCreators(
    actionCreators.EntriesActions,
    dispatch
  );
  return (
    <div
      onClick={() => openEntry(entry.id, !entry.meta.open)}
      className="glance"
    >
      <div className="entry-col-1">
        <StatusIndiciator status={entry.status} />
        <p>{entry.file}</p>
      </div>
      <div className="entry-col-2">
        <p>Application: {entry.application.name}</p>
        <p>Hostname: {entry.hostname}</p>
      </div>
      <BsChevronDown
        className="entry-open-indicator transition-all"
        style={{
          transform: entry.meta.open ? "rotate(0deg)" : "rotate(-90deg)",
        }}
      />
    </div>
  );
};

export default Glance;
