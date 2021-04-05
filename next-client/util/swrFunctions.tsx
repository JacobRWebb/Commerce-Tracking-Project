import useSwr from "swr";
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
  const { data, error, mutate } = useSwr<Iuser>("/user", fetcher, {
    refreshInterval: 500,
  });
  return {
    data: !error ? data : undefined,
    loading: !data && !error,
    error,
    mutate,
  };
};
