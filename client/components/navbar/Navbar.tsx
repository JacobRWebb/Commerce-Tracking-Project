import { FunctionComponent } from "react";
import {
  AiOutlineHome,
  AiOutlineLock,
  AiOutlineUserDelete,
} from "react-icons/ai";
import NavLink from "./NavLink";

const Navbar: FunctionComponent = () => {
  return (
    <div className="navbar">
      <div className="nav-menu">
        <h1>ATAS</h1>
      </div>
      <div className="nav-menu">
        <NavLink to="/" tooltip="Home">
          <AiOutlineHome />
        </NavLink>
        <NavLink to="/admin" tooltip="Admin View">
          <AiOutlineLock />
        </NavLink>
        <NavLink to="/logout" tooltip="Logout">
          <AiOutlineUserDelete />
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
