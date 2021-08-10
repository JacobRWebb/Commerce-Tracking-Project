import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./RootReducer";

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    console.log("Store Reducer Hydrate");
    console.log(state);
    console.log(action);

    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    console.log("Store Reducer Else");
    console.log(state);
    console.log(action);

    return rootReducer(state, action);
  }
};

const initStore = () => {
  return createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
};

export const wrapper = createWrapper(initStore);
// export type AppThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
