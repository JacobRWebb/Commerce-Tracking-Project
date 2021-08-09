import { FunctionComponent } from "react";
import { EStatus } from "../interfaces/IEntryInterfaces";
import { caseFix } from "../util/helper";

const StatusIndiciator: FunctionComponent<{ status: EStatus }> = ({
  status,
}) => {
  const enumToString = caseFix(status.toString());

  return (
    <span className="entry-status-indicator relative inline-flex bg-gray-200 rounded max-w-first">
      <p className="w-full text-background-dark text-center">{enumToString}</p>
      <span className="flex absolute h-3 w-3 top-0 left-0 -mt-1 -ml-1">
        <span
          className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-status-${enumToString} opacity-75`}
        ></span>
        <span
          className={`relative inline-flex rounded-full h-3 w-3 bg-status-${enumToString}`}
        ></span>
      </span>
    </span>
  );
};

export default StatusIndiciator;
