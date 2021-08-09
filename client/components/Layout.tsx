import { FunctionComponent } from "react";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="layout h-screen w-screen items-center bg-gradient-to-tl from-background-light to-background-dark p-5">
      {children}
    </div>
  );
};

export default Layout;
