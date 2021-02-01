import { SunIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Button, useColorMode } from "@chakra-ui/react";

const Toggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bottom={10} left={10} position="fixed">
      <Button borderColor="black" border="1px" onClick={toggleColorMode}>
        {colorMode === "light" ? <ViewOffIcon /> : <SunIcon />}
      </Button>
    </Box>
  );
};
export default Toggle;
