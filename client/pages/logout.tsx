import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { API_DOMAIN } from "../util/constants";
import { useUser } from "../util/swrFunctions";

const Logout: FunctionComponent = () => {
  const { mutate } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_DOMAIN}/user/logout`, {
      credentials: "include",
    })
      .then(() => {
        mutate(undefined);
        router.push("/login");
      })
      .catch(() => {
        //  Does not matter here!
      });
  });
  return <></>;
};

export default Logout;
