import React, { FunctionComponent, useEffect, useState } from "react";
import { API_DOMAIN } from "../util/constants";

export enum IStatus {
  ALL,
  UNACKNOWLEDGED,
  ACKNOWLEDGED,
  DECLINED,
}

export interface IEntry {
  id: string;
  status: IStatus;
  timestamp: string;
  hostname: string;
  changeAgent: string;
  changeProcess: string;
  file: string;
  userId: string;
  applicationId: string;
}

export interface IEntryContext {
  entries: IEntry[];
}

export const EntryContext = React.createContext<IEntryContext>({ entries: [] });

const EntryContextProvider: FunctionComponent = ({ children }) => {
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    fetch(`${API_DOMAIN}/entry`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => {
        if (result.status === 200 || result.status === 400) {
          return result.json();
        }
      })
      .then((data) => {
        if (typeof data === "object") {
          if (data.entries) {
            setEntries(data.entries);
          }
        }
      });
  }, []);

  return (
    <EntryContext.Provider value={{ entries }}>
      {children}
    </EntryContext.Provider>
  );
};

export default EntryContextProvider;
