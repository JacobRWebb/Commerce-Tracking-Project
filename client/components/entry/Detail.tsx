import CommentContainer from "components/comment/CommentContainer";
import React, { FunctionComponent } from "react";
import { IEntry } from "../../interfaces/IEntryInterfaces";
import EntryDetailModule from "./module/EntryDetailModule";
import EntryStatusModule from "./module/EntryStatusModule";

const Detail: FunctionComponent<{ entry: IEntry }> = ({ entry }) => {
  return (
    <div
      id={entry.id}
      className={`flex flex-col items-center justify-between ${
        entry.meta.open ? "p-3" : "p-0"
      } bg-white`}
      style={{ height: entry.meta.open ? "100%" : "0px" }}
    >
      {entry.meta.open ? (
        [
          <EntryDetailModule key={`${entry.id}-Detail`} entry={entry} />,
          <EntryStatusModule key={`${entry.id}-Status`} />,
          <CommentContainer key={`${entry.id}-Comment`} entry={entry} />,
        ]
      ) : (
        <></>
      )}
    </div>
  );
};

export default Detail;
