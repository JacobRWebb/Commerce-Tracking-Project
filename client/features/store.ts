import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { isProd } from "util/constants";
import authReducer from "./auth/authReducer";
import entriesReducer from "./entries/entriesReducer";
import filterReducer from "./filter/filterReducer";
import rootReducer from "./RootReducer";

const reducer = (state: RootState, action): RootState => {
  if (action.type === HYDRATE) {
    const nextState: RootState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = ({ ...test }) => {
  return configureStore({
    reducer: reducer,
    devTools: true,
  });
};
export type AppStore = ReturnType<typeof initStore>;

export const wrapper = createWrapper<AppStore>(initStore);

const combined = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  entries: entriesReducer,
});

export const store = configureStore({
  reducer: combined,
  devTools: !isProd,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
