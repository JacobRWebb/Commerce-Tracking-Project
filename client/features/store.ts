import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { AnyAction, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkDispatch } from "redux-thunk";
import rootReducer, { RootState } from "./RootReducer";

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
};

export const wrapper = createWrapper(initStore);
export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
