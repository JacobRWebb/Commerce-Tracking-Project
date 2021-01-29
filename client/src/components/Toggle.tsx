import { Box, Button, useColorMode } from "@chakra-ui/react";
import { RiLightbulbFill, RiLightbulbFlashFill } from "react-icons/ri";

const Toggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bottom={10} left={10} position="fixed">
      <Button borderColor="black" border="1px" onClick={toggleColorMode}>
        {colorMode === "light" ? <RiLightbulbFill /> : <RiLightbulbFlashFill />}
      </Button>
    </Box>
  );
};
export default Toggle;
