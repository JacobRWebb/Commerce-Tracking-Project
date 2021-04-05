import { Button } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { FunctionComponent } from "react";

const NavLink: FunctionComponent<{ to: string }> = ({ children, to }) => {
  const router = useRouter();

  const redirect = () => {
    router.push(to);
  };

  return <Button onClick={() => redirect()}>{children}</Button>;
};

export default NavLink;
