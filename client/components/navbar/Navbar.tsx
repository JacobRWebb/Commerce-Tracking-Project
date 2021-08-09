import { FunctionComponent, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import NavButton from "./NavButton";
import NavMenu from "./NavMenu";

const Navbar: FunctionComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <div className="headerContainer" aria-expanded={open}>
        <h1 className="companyTitle">ATAS</h1>

        {open ? (
          <AiOutlineClose
            onClick={() => setOpen(false)}
            className="navOpenBtn"
          />
        ) : (
          <AiOutlineMenu onClick={() => setOpen(true)} className="navOpenBtn" />
        )}
      </div>
      <NavMenu open={open}>
        <NavButton to="/" value="Homepage" />
        <NavButton to="/admin" value="Admin" />
        <NavButton to="/logout" value="Logout" />
      </NavMenu>
    </div>
  );
};

export default Navbar;
