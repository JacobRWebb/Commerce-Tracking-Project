import { Stack, StackProps } from "@chakra-ui/layout";
import { FunctionComponent } from "react";

const Container: FunctionComponent<StackProps> = ({
  children,
  ...StackProps
}) => {
  return (
    <Stack
      backgroundColor="white"
      boxShadow="lg"
      borderWidth="3px"
      borderRadius="5px"
      borderColor="gray.100"
      {...StackProps}
    >
      {children}
    </Stack>
  );
};

export default Container;
