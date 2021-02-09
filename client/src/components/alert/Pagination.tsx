import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useColorMode,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

interface Props {
  page: number;
  totalPages: number;
  rows: number;
  setPage: (page: number) => void;
}
const Pagination: React.FC<Props> = ({ page, totalPages, rows, setPage }) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      marginTop={3}
      marginBottom={4}
      justify="space-evenly"
      direction={["column", "row"]}
    >
      <Button isDisabled={page <= 1} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <Wrap align="center">
        <WrapItem>
          <NumberInput
            overflow="hidden"
            backgroundColor={colorMode === "light" ? "white" : "black"}
            borderRadius={5}
            defaultValue={page}
            value={page}
            onChange={(v, n) => {
              if (n > totalPages) {
                setPage(totalPages);
              } else if (n < 1) {
                setPage(1);
              } else {
                setPage(n);
              }
            }}
            min={1}
            max={totalPages}
            keepWithinRange={true}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </WrapItem>
        <WrapItem>
          <Text marginLeft={1}>
            / {totalPages} pages : {rows} rows
          </Text>
        </WrapItem>
      </Wrap>
      <Button isDisabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </Button>
    </Stack>
  );
};
export default Pagination;
