import { EStatus } from "../../interfaces/IEntryInterfaces";

export enum EFilterActions {
  UPDATE = "update-filter",
  RESET = "reset-filter",
  CHANGE_OPEN = "change-open-filter",
}

export interface IFilter {
  isOpen: boolean;
  take: number;
  skip: number;
  hostname: string | null;
  extended: boolean;
  status: EStatus | null;
}

export interface IFilterUpdateAction {
  type: EFilterActions.UPDATE;
  payload: Partial<IFilter>;
}

export interface IFilterResetAction {
  type: EFilterActions.RESET;
}

export interface IFilterChangeOpenAction {
  type: EFilterActions.CHANGE_OPEN;
  payload: boolean;
}

export type FilterActions =
  | IFilterUpdateAction
  | IFilterResetAction
  | IFilterChangeOpenAction;
