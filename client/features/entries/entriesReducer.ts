import {
  EEntryActions,
  EntriesActions,
  IEntriesState,
  IEntry,
} from "../../interfaces/IEntryInterfaces";

const initialState: IEntriesState = {
  entries: [],
  count: 0,
};

const entriesReducer = (
  state: IEntriesState = initialState,
  action: EntriesActions
): IEntriesState => {
  let entriesChange: IEntry[] = [];

  switch (action.type) {
    case EEntryActions.FETCH:
      return Object.assign({}, state, action.payload);
    case EEntryActions.OPEN:
      entriesChange = state.entries.map((entry) => {
        if (entry.id === action.payload.id) {
          entry.meta.open = action.payload.open;
        }
        return entry;
      });

      return Object.assign({}, state, { entries: entriesChange });
    case EEntryActions.SET_CURRENT_COMMENT:
      entriesChange = state.entries.map((entry) => {
        if (entry.id === action.payload.id) {
          entry.meta.currentComment = action.payload.comment;
        }
        return entry;
      });

      return Object.assign({}, state, { entries: entriesChange });
    case EEntryActions.SET_COMMENTS:
      entriesChange = state.entries.map((entry) => {
        if (entry.id === action.payload.id) {
          entry.meta.comments = action.payload.comments;
        }
        return entry;
      });

      return Object.assign({}, state, { entries: entriesChange });
    default:
      return state;
  }
};

export default entriesReducer;
