import React from "react";
import { IApplication } from "./IApplicationInterfaces";
import { IUser } from "./IUserInterfaces";

export enum EStatus {
  ALL = "all",
  ACKNOWLEDGED = "Acknowledged",
  UNACKNOWLEDGED = "Unacknowledged",
  DECLINED = "declined",
}

export interface IEntryComment {
  id: string;
  comment: string;
  user: Partial<IUser>;
  createdAt: Date;
}

export interface IEntry {
  id: string;
  status: EStatus;
  timestamp: string;
  hostname: string;
  changeAgent: string;
  changeProcess: string;
  file: string;
  userId: string;
  user?: IUser;
  applicationId: string;
  application?: IApplication;
  meta: {
    open: boolean;
    currentComment: IEntryComment | null;
    comments: IEntryComment[];
  };
}

export interface IEntriesState {
  entries: IEntry[];
  count: number;
}

export enum EEntryMethods {
  REQUEST = "request_comments",
  COMMENT_RESPONSE = "comment_response",
  COMMENT_DELETED = "comment_deleted",
  COMMENT_ADDED = "comment_added",
  STATUS_CHANGE = "status_change",
}

export interface ISocketEntrySending {
  METHOD: EEntryMethods;
  data: {
    entryId: string;
    userToken: string;
    newComment?: string;
    commentId?: string;
  };
}

export interface ISocketEntryRecieving {
  METHOD: EEntryMethods;
  data: {
    entryId: string;
    comments?: IEntryComment[];
  };
}

export interface IEntryContext {
  entry: IEntry | undefined;
  refGlance: React.RefObject<HTMLDivElement>;
  refDetail: React.RefObject<HTMLDivElement>;
  showing: boolean;
  setShowing: () => void;
  height: number | undefined;
  setHeight: () => void;
  currentComment: IEntryComment | undefined;
  setCurrentComment: (comment: IEntryComment | undefined) => void;
  comments: IEntryComment[];
  setComments: () => void;
}

//  Redux Actions

export type EntriesActions =
  | IEntryFetchAction
  | IEntryOpenAction
  | IEntrySetCurrentCommentAction
  | IEntrySetCommentsAction;

export enum EEntryActions {
  FETCH = "fetch_entries",
  OPEN = "open_entry",
  SET_CURRENT_COMMENT = "set_current_comment",
  SET_COMMENTS = "set_comments",
  DELETE_COMMENT = "delete_comment",
  SEND_COMMENT = "send_comment",
}

export interface IEntryFetchAction {
  type: EEntryActions.FETCH;
  payload: IEntriesState;
}

export interface IEntryOpenAction {
  type: EEntryActions.OPEN;
  payload: {
    id: string;
    open: boolean;
  };
}

export interface IEntrySetCurrentCommentAction {
  type: EEntryActions.SET_CURRENT_COMMENT;
  payload: {
    id: string;
    comment: IEntryComment | undefined;
  };
}

export interface IEntrySetCommentsAction {
  type: EEntryActions.SET_COMMENTS;
  payload: {
    id: string;
    comments: IEntryComment[];
  };
}
