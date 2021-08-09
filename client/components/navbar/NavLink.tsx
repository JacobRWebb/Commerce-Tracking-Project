import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";

export interface INavLink {
  to: string;
  tooltip?: string;
}

const NavLink: FunctionComponent<INavLink> = ({ to, tooltip, children }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    setCurrent(location.pathname === `${to}`);
  }, []);

  return (
    <a
      className="flex flex-col align-middle justify-center h-full w-7"
      onClick={() => {
        if (!current) {
          router.push(to);
        }
      }}
      aria-checked={current}
    >
      {children}
      {tooltip ? <p className="hidden group-hover:flex">{tooltip}</p> : <></>}
    </a>
  );
};

export default NavLink;
