import { AuthActions, EAuthActions, IAuthState } from "./authActions";

const initialState: IAuthState = {
  error: null,
  user: null,
  fetching: false,
};

const authReducer = (state: IAuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case EAuthActions.LOGIN:
      return { ...state, ...action.payload, fetching: false };
    case EAuthActions.ERROR:
      console.log("There is an auth error somewhere.");

      return { ...state, ...action.payload, user: null, fetching: false };
    case EAuthActions.LOGOUT:
      return { error: null, user: null, fetching: false };
    default:
      return state;
  }
};

export default authReducer;
