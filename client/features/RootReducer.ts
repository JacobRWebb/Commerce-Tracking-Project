import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import entriesReducer from "./entries/entriesReducer";
import filterReducer from "./filter/filterReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  entries: entriesReducer,
});

export default rootReducer;
