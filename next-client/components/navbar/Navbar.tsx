import { Button } from "@chakra-ui/button";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/layout";
import { FunctionComponent, useEffect, useState } from "react";
import IRole from "../../interface/IRole";
import { useUser } from "../../util/swrFunctions";
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import NavUser from "./NavUser";

const Navbar: FunctionComponent = () => {
  const useuser = useUser();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {}, [useuser]);

  return (
    <Stack
      backgroundColor="white"
      minHeight={["100%", "50px"]}
      maxHeight={[navOpen ? "unset" : "60px", "60px"]}
      direction={["column", "row"]}
      justify="space-between"
      paddingLeft="10%"
      paddingRight="10%"
      borderTopColor="green.600"
      borderTopWidth="2px"
      boxShadow="lg"
      align="center"
      position="sticky"
      top="0"
      zIndex={2}
    >
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        width={["250px", "unset"]}
      >
        <div></div>
        <NavLogo title="ATAS" />
        <Button
          onClick={() => setNavOpen(!navOpen)}
          size="sm"
          display={["flex", "none"]}
        >
          {!navOpen ? <HamburgerIcon /> : <CloseIcon />}
        </Button>
      </Stack>
      <NavMenu navOpen={navOpen}>
        <NavLink to="/">Home</NavLink>
        {useuser.data ? (
          <>
            {useuser.data.role === IRole.ADMIN ? (
              <NavLink to="/admin">Admin</NavLink>
            ) : (
              <></>
            )}
            <NavUser user={useuser.data}>
              <NavLink to="/logout">Logout</NavLink>
            </NavUser>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </NavMenu>
    </Stack>
  );
};

export default Navbar;
