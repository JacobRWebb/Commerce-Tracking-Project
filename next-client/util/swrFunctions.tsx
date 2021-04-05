import { useContext } from "react";
import { default as useSWR, default as useSwr } from "swr";
import { EntryContext } from "../context/EntryContext";
import IEntry from "../interface/IEntry";
import Iuser from "../interface/IUser";
import { API_DOMAIN } from "./constants";

const fetcher = (
  input: RequestInfo,
  init: RequestInit = { credentials: "include" }
) => {
  return fetch(`${API_DOMAIN}${input}`, init).then((response) =>
    response.json()
  );
};

export const useUser = () => {
  const { data, error, mutate } = useSwr<Iuser>("/user", fetcher);
  return {
    data: !error ? data : undefined,
    loading: !data && !error,
    error,
    mutate,
  };
};

interface IEntryReturn {
  alerts: IEntry[];
  count: number;
}

export const useEntries = () => {
  const context = useContext(EntryContext);

  const CustomFetcher = (
    input: RequestInfo,
    init: RequestInit = {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(context.filter),
      headers: { "Content-Type": "application/json" },
    }
  ) => {
    return fetch(`${API_DOMAIN}${input}`, init).then((response) =>
      response.json()
    );
  };

  const { data, error, mutate } = useSWR<IEntryReturn>("/alert", CustomFetcher);

  return {
    data: !error ? data : undefined,
    loading: !error && !data,
    error,
    mutate,
  };
};
