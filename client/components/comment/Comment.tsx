import { actionCreators } from "features";
import { IEntry, IEntryComment } from "interfaces/IEntryInterfaces";
import { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

const Comment: FunctionComponent<{ entry: IEntry; comment: IEntryComment }> = ({
  entry,
  comment,
}) => {
  const dispatch = useDispatch();
  const { setCurrentComment } = bindActionCreators(
    actionCreators.EntriesActions,
    dispatch
  );

  const currentComment = () => {
    if (entry.meta.currentComment === null) return false;
    if (entry.meta.currentComment.id === comment.id) return true;
    return false;
  };

  return (
    <a
      onClick={() => {
        if (!currentComment()) {
          setCurrentComment(entry.id, comment);
        }
      }}
      className={`comment ${currentComment() ? "selectedComment" : ""}`}
    >
      {comment.user.username}
    </a>
  );
};
export default Comment;
