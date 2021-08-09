import { Dispatch } from "react";
import { API_DOMAIN } from "../../util/constants";
import {
  AuthActions,
  EAuthActions,
  IAuthErrorAction,
  IAuthLoginAction,
  IAuthLoginInput,
  IAuthLogoutAction,
  IAuthTokenCheck,
} from "./authActions";

export const login = (data: IAuthLoginInput) => {
  return async (dispatch: Dispatch<IAuthLoginAction | IAuthErrorAction>) => {
    const response = await fetch(`${API_DOMAIN}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (response.status === 200 || response.status === 400) {
      const data = await response.json();
      if (data.user && data.token) {
        dispatch({
          type: EAuthActions.LOGIN,
          payload: { user: { ...data.user, token: data.token } },
        });
      } else {
        dispatch({
          type: EAuthActions.ERROR,
          payload: { error: { param: "Server", msg: "Incorrect Credentials" } },
        });
      }
    } else {
      dispatch({
        type: EAuthActions.ERROR,
        payload: { error: { param: "Server", msg: "Server did not respond" } },
      });
    }
  };
};

export const checkToken = (data: IAuthTokenCheck) => {
  return async (dispatch: Dispatch<AuthActions>) => {
    const response = await fetch(`${API_DOMAIN}/user/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token: data.token,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      dispatch({
        type: EAuthActions.LOGIN,
        payload: { user: { ...data.user, token: data.token } },
      });
    } else {
      dispatch({
        type: EAuthActions.ERROR,
        payload: {},
      });
    }
  };
};

export const logout = () => {
  return (dispatch: Dispatch<IAuthLogoutAction>) => {
    dispatch({
      type: EAuthActions.LOGOUT,
      payload: {},
    });
  };
};
