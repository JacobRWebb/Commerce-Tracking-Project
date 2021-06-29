import { FunctionComponent } from "react";
import { IStatus } from "../context/EntryContext";

const StatusIndiciator: FunctionComponent<{ status: IStatus }> = ({
  status,
}) => {
  return (
    <div className="status-indicator">
      <span className={`indicator ${status}`}></span>
      <p>{status}</p>
    </div>
  );
};

export default StatusIndiciator;
