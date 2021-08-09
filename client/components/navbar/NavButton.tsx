import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";

export interface INavButton {
  to: string;
  value: string;
}

const NavButton: FunctionComponent<INavButton> = ({ to, value, children }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    setCurrent(location.pathname === `${to}`);
  }, []);

  return (
    <div
      onClick={() => {
        if (typeof window !== undefined) {
          if (window.location.pathname !== to) {
            router.push(to);
          }
        }
      }}
      className={`navButton`}
      aria-expanded={current}
    >
      <p>{value}</p>
    </div>
  );
};

export default NavButton;
