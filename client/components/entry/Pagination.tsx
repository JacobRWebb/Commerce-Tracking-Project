import { Button } from "@chakra-ui/button";
import { Stack, Text } from "@chakra-ui/layout";
import { NumberInput, NumberInputField } from "@chakra-ui/number-input";
import { FunctionComponent, useContext } from "react";
import { EntryContext } from "../../context/EntryContext";

const Pagination: FunctionComponent = () => {
  const context = useContext(EntryContext);

  const page = context.filter.page;
  const totalPages = Math.ceil(context.count / context.filter.take);

  if (totalPages < 1) return <></>;

  return (
    <Stack direction="row" justify="flex-end" align="center" spacing="11px">
      <Button
        onClick={() => context.updateFilter({ page: page - 1 })}
        disabled={page <= 1}
      >
        Last Page
      </Button>
      <NumberInput
        width="100px"
        defaultValue={page}
        value={page === 0 ? 1 : page}
        min={1}
        max={totalPages}
        onChange={(v, n) => {
          if (v.length < 1 || n === undefined || n === NaN) {
            context.updateFilter({ page: 1 });
            return;
          }
          if (page === n) return;
          const rangedValue = Math.min(Math.max(1, n), totalPages);
          context.updateFilter({ page: rangedValue });
        }}
      >
        <NumberInputField />
      </NumberInput>
      <Text minWidth="30px">| {totalPages}</Text>
      <Button
        onClick={() => context.updateFilter({ page: page + 1 })}
        disabled={page >= totalPages}
      >
        Next Page
      </Button>
    </Stack>
  );
};

export default Pagination;
