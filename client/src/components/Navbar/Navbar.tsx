import { Button } from "@chakra-ui/button";
import { HamburgerIcon, MinusIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/layout";
import theme from "@chakra-ui/theme";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Role, _MasterContext } from "../context/MasterContext";

const Navbar: React.FC = () => {
  const context = useContext(_MasterContext);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Stack
      direction={["column", "row"]}
      as="nav"
      align="center"
      justify="space-between"
      padding={2}
      boxShadow="lg"
      position="sticky"
      top={0}
      backgroundColor="white"
      zIndex={999}
      paddingLeft="10%"
      paddingRight="10%"
      borderTopColor={theme.colors.green[600]}
      borderTopWidth={2}
    >
      <Stack justify="space-between" direction="row" width="100%">
        <Stack align="center" direction="row">
          <img width="25" height="25" src="globe.svg" alt="LOGO" />
          <Text
            color={theme.colors.green[600]}
            fontWeight="bold"
            fontSize="3xl"
          >
            ATAS
          </Text>
        </Stack>

        <Button display={["flex", "none"]} onClick={() => setNavOpen(!navOpen)}>
          {navOpen ? <MinusIcon /> : <HamburgerIcon />}
        </Button>
      </Stack>
      <Stack
        direction={["column", "row"]}
        display={[navOpen ? "flex" : "none", "flex"]}
        width={["100%", "unset"]}
        align="center"
      >
        <NavLink to="/" title="Home" />
        {context.AuthState.auth ? (
          <>
            {context.AuthState.role === Role.ADMIN ? (
              <NavLink to="/admin" title="Admin Page" />
            ) : (
              <></>
            )}
            <NavLink to="/logout" title="Logout" />
          </>
        ) : (
          <></>
        )}
      </Stack>
    </Stack>
  );
};

const NavLink: React.FC<{ title?: string; to: string }> = ({
  title = "",
  to = "/",
}) => {
  return (
    <Button as={Link} to={to} width={["100%", "unset"]}>
      {title}
    </Button>
  );
};

export default Navbar;
