import { actionCreators, RootState } from "features";
import { IEntry } from "interfaces/IEntryInterfaces";
import { FunctionComponent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";

const CommentActionMenu: FunctionComponent<{
  entry: IEntry;
  value: string;
  submitComment: () => void;
  deleteComment: () => void;
}> = ({ entry, value, submitComment, deleteComment }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { setCurrentComment } = bindActionCreators(
    actionCreators.EntriesActions,
    dispatch
  );

  const editing = () => {
    if (entry.meta.currentComment !== null) return false;
    if (personalComment()) return false;
    if (otherComment()) return false;
    if (value.length < 1) return false;
    return true;
  };

  const personalComment = () => {
    if (entry.meta.currentComment === null) return false;
    if (entry.meta.currentComment.user.username === state.auth.user.username)
      return true;
    return false;
  };

  const otherComment = () => {
    if (entry.meta.currentComment === null) return false;
    if (entry.meta.currentComment.user.username !== state.auth.user.username)
      return true;
    return false;
  };

  if (editing() || otherComment() || personalComment()) {
    return (
      <div className="commentActionMenu">
        <AiOutlineClose
          className={`${personalComment() || otherComment() ? "flex" : "hidden"}
          closeBtn`}
          onClick={() => setCurrentComment(entry.id, null)}
        />
        <button
          className={`${editing() ? "flex" : "hidden"} submitBtn`}
          onClick={() => submitComment()}
        >
          Submit
        </button>
        <button
          className={`${personalComment() ? "flex" : "hidden"} deleteBtn`}
          onClick={() => deleteComment()}
        >
          Delete
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};

export default CommentActionMenu;
