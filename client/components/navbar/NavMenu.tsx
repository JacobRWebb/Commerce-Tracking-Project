import { FunctionComponent } from "react";

const NavMenu: FunctionComponent<{ open: boolean }> = ({ children, open }) => {
  return (
    <div className={`navMenu`} aria-expanded={open}>
      {children}
    </div>
  );
};

export default NavMenu;
