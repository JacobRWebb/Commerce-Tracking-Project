export enum EAuthActions {
  LOGIN = "login",
  TOKEN_CHECK = "token_check",
  ERROR = "error",
  LOGOUT = "logout",
}

export interface IAuthTokenCheck {
  token: string;
}

export interface IAuthLoginInput {
  username: string;
  password: string;
}

export interface IAuthLoginAction {
  type: EAuthActions.LOGIN;
  payload: Partial<IAuthState>;
}

export interface IAuthErrorAction {
  type: EAuthActions.ERROR;
  payload: Partial<IAuthState>;
}

export interface IAuthLogoutAction {
  type: EAuthActions.LOGOUT;
  payload: {};
}

export enum UserRoles {
  ADMIN = "Admin",
  USER = "User",
}

export interface IAuthState {
  user: {
    username: string;
    role: UserRoles;
    token: string;
  } | null;
  error: { msg: string; param: string } | null;
  fetching: boolean;
}

export type AuthActions =
  | IAuthLoginAction
  | IAuthErrorAction
  | IAuthLogoutAction;
