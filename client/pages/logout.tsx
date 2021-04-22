import useRouter from "next/router";
import { FunctionComponent, useEffect } from "react";
import { mutate } from "swr";
import { API_DOMAIN } from "../util/constants";

const Logout: FunctionComponent = () => {
  useEffect(() => {
    fetch(`${API_DOMAIN}/user/logout`, {
      credentials: "include",
    })
      .catch(() => {})
      .finally(() => {
        mutate("/user");
        useRouter.push("/");
      });
  });
  return <></>;
};

export default Logout;
