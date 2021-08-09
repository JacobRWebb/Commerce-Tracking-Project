import { IEntry } from "interfaces/IEntryInterfaces";
import { FunctionComponent } from "react";
import Comment from "./Comment";

const CommentUserList: FunctionComponent<{ entry: IEntry }> = ({ entry }) => {
  if (entry.meta.comments.length < 1) {
    return <></>;
  }

  return (
    <div className="commentUserList scroll">
      {entry.meta.comments.map((comment) => (
        <Comment key={comment.id} entry={entry} comment={comment} />
      ))}
    </div>
  );
};

export default CommentUserList;
