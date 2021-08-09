import { actionCreators, RootState } from "features";
import {
  EEntryMethods,
  IEntry,
  ISocketEntrySending,
} from "interfaces/IEntryInterfaces";
import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import socket from "util/socket";
import CommentActionMenu from "./CommentActionMenu";

const CommentReadPostArea: FunctionComponent<{ entry: IEntry }> = ({
  entry,
}) => {
  const dispatch = useDispatch();
  const { setCurrentComment } = bindActionCreators(
    actionCreators.EntriesActions,
    dispatch
  );
  const state = useSelector((state: RootState) => state);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (entry.meta.currentComment) {
      const check = entry.meta.comments
        .map((comment) => comment.id)
        .indexOf(entry.meta.currentComment.id);
      if (check < 0) {
        setCurrentComment(entry.id, null);
      }
    }
  });

  const submitComment = () => {
    if (value.length > 1) {
      const outgoing_data: ISocketEntrySending = {
        METHOD: EEntryMethods.COMMENT_ADDED,
        data: {
          entryId: entry.id,
          userToken: state.auth.user.token,
          newComment: value,
        },
      };
      socket.emit("entry", outgoing_data);
      setValue("");
    }
  };

  const deleteComment = () => {
    const outgoing_data: ISocketEntrySending = {
      METHOD: EEntryMethods.COMMENT_DELETED,
      data: {
        entryId: entry.id,
        userToken: state.auth.user.token,
        commentId: entry.meta.currentComment.id,
      },
    };
    socket.emit("entry", outgoing_data);
    setCurrentComment(entry.id, null);
  };

  return (
    <div className="commentReadPostArea">
      <CommentActionMenu
        entry={entry}
        value={value}
        submitComment={submitComment}
        deleteComment={deleteComment}
      />
      <textarea
        className="commentTextArea scroll"
        placeholder="Leave a comment"
        value={
          entry.meta.currentComment !== null
            ? entry.meta.currentComment.comment
            : value
        }
        disabled={entry.meta.currentComment !== null}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
      />
    </div>
  );
};

export default CommentReadPostArea;
