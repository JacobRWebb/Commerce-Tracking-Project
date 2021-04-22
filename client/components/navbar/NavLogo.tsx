import { Image } from "@chakra-ui/image";
import { Stack, Text } from "@chakra-ui/layout";
import { FunctionComponent } from "react";

const NavLogo: FunctionComponent<{ title: string }> = ({ title }) => {
  return (
    <Stack direction="row" align="center">
      <Image src="globe.svg" height="25px" width="25px" />
      <Text
        fontFamily="cera"
        fontWeight="bold"
        fontSize="3xl"
        color="green.600"
      >
        {title}
      </Text>
    </Stack>
  );
};
export default NavLogo;
