import { Dispatch } from "react";
import {
  EEntryActions,
  EntriesActions,
  IEntriesState,
  IEntry,
  IEntryComment,
} from "../../interfaces/IEntryInterfaces";
import { API_DOMAIN } from "../../util/constants";
import { IFilter } from "../filter/filterActions";

export const fetchEntries = (filter: IFilter, token?: string) => {
  return async (dispatch: Dispatch<EntriesActions>) => {
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/admin") {
        filter.extended = true;
      }
    }

    const response = await fetch(`${API_DOMAIN}/entry`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filter: filter, token }),
    });

    if (response.status === 200) {
      let data: IEntriesState = await response.json();
      data.entries = data.entries.map((entry) => {
        let newEntry: IEntry = entry;
        newEntry.meta = {
          open: false,
          currentComment: null,
          comments: [],
        };
        return newEntry;
      });
      dispatch({
        type: EEntryActions.FETCH,
        payload: { ...data },
      });
    }
  };
};

export const openEntry = (id: string, open: boolean) => {
  return (dispatch: Dispatch<EntriesActions>) => {
    dispatch({
      type: EEntryActions.OPEN,
      payload: {
        id,
        open,
      },
    });
  };
};

export const setCurrentComment = (
  id: string,
  comment: IEntryComment | null
) => {
  if (comment === undefined) {
    comment = null;
  }
  return (dispatch: Dispatch<EntriesActions>) => {
    dispatch({
      type: EEntryActions.SET_CURRENT_COMMENT,
      payload: {
        id,
        comment,
      },
    });
  };
};

export const setComments = (id: string, comments: IEntryComment[]) => {
  return (dispatch: Dispatch<EntriesActions>) => {
    dispatch({
      type: EEntryActions.SET_COMMENTS,
      payload: {
        id,
        comments,
      },
    });
  };
};
