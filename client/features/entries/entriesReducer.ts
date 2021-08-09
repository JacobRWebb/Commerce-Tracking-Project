import {
  EEntryActions,
  EntriesActions,
  IEntriesState,
} from "../../interfaces/IEntryInterfaces";

const initialState: IEntriesState = {
  entries: [],
  count: 0,
};

const entriesReducer = (
  state: IEntriesState = initialState,
  action: EntriesActions
): IEntriesState => {
  switch (action.type) {
    case EEntryActions.FETCH:
      return { ...state, ...action.payload };
    case EEntryActions.OPEN:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry.meta.open = action.payload.open;
          }
          return entry;
        }),
      };
    case EEntryActions.SET_CURRENT_COMMENT:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry.meta.currentComment = action.payload.comment;
          }
          return entry;
        }),
      };
    case EEntryActions.SET_COMMENTS:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry.meta.comments = action.payload.comments;
          }
          return entry;
        }),
      };
    default:
      return state;
  }
};

export default entriesReducer;
