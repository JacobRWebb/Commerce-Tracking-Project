import { Dispatch } from "react";
import {
  EFilterActions,
  IFilter,
  IFilterChangeOpenAction,
  IFilterResetAction,
  IFilterUpdateAction,
} from "./filterActions";

export const updateFilter = (filter: Partial<IFilter>) => {
  return async (dispatch: Dispatch<IFilterUpdateAction>) => {
    dispatch({
      type: EFilterActions.UPDATE,
      payload: filter,
    });
  };
};

export const resetFilter = () => {
  return (dispatch: Dispatch<IFilterResetAction>) => {
    dispatch({
      type: EFilterActions.RESET,
    });
  };
};

export const changeOpen = (open: boolean) => {
  return (dispatch: Dispatch<IFilterChangeOpenAction>) => {
    dispatch({
      type: EFilterActions.CHANGE_OPEN,
      payload: open,
    });
  };
};
