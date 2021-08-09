import EntryMenu from "components/entry/EntryMenu";
import { IEntry } from "interfaces/IEntryInterfaces";
import { FunctionComponent } from "react";
import CommentReadPostArea from "./CommentReadPostArea";
import CommentUserList from "./CommentUserList";

const CommentContainer: FunctionComponent<{ entry: IEntry }> = ({ entry }) => {
  console.log(entry);
  return (
    <EntryMenu>
      <div className="commentContainer">
        <CommentUserList entry={entry} />
        <CommentReadPostArea entry={entry} />
      </div>
    </EntryMenu>
  );
};

export default CommentContainer;
