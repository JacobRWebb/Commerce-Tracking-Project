import { Avatar } from "@chakra-ui/avatar";
import { Stack, Text } from "@chakra-ui/layout";
import { FunctionComponent, useState } from "react";
import Iuser from "../../interface/IUser";

const NavUser: FunctionComponent<{ user: Iuser }> = ({ user, children }) => {
  const [avatarDropdown, setAvatarDropdown] = useState(false);

  return (
    <Stack
      position="relative"
      direction="column"
      display="inline-block"
      spacing={0}
      onMouseEnter={() => setAvatarDropdown(true)}
      onMouseLeave={() => setAvatarDropdown(false)}
      padding="2px"
    >
      <Stack direction="row" backgroundColor="white" align="center">
        <Text fontSize="xl">{user.username}</Text>
        <Avatar src="/fakeMan.jpg" width="40px" height="40px" />
      </Stack>
      <Stack
        paddingTop="5px"
        display={avatarDropdown ? "block" : "none"}
        spacing={2}
        direction="column"
        position="absolute"
        backgroundColor="white"
        borderBottomRadius="5px"
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default NavUser;
