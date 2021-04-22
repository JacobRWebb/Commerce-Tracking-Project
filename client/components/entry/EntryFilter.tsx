import { Button, ButtonGroup } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Divider, Stack, Text } from "@chakra-ui/layout";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import theme from "@chakra-ui/theme";
import { FunctionComponent, useContext, useEffect } from "react";
import { EntryContext } from "../../context/EntryContext";
import { AlertStatus } from "../../interface/IEntry";

const EntryFilter: FunctionComponent = () => {
  const context = useContext(EntryContext);
  if (!context) return <></>;

  const maxPage = Math.ceil(context.count / context.filter.take);

  useEffect(() => {
    const pathName = window.location.pathname;
    if (context.filter.extended) {
      if (pathName !== "/admin") {
        context.updateFilter({ extended: false });
      }
    } else {
      if (pathName === "/admin") {
        context.updateFilter({ extended: true });
      }
    }
  }, [context.filter]);

  return (
    <Stack direction="column">
      <Stack
        borderRadius={3}
        padding={2}
        backgroundColor="gray.200"
        direction="row"
        justify="space-between"
      >
        <Button onClick={() => context.setFilterOpen()} colorScheme="blue">
          Filter
        </Button>
        <Button onClick={() => context.fetchEntries()} colorScheme="blue">
          Refresh
        </Button>
      </Stack>
      <Stack
        display={context.entries.length < 1 ? "none" : "flex"}
        direction="row"
        align="center"
        justify="flex-end"
      >
        <Button
          disabled={context.filter.page <= 1}
          onClick={() =>
            context.updateFilter({
              page: context.filter.page - 1,
            })
          }
        >
          Last Page
        </Button>
        <NumberInput
          width="100px"
          defaultValue={context.filter.page}
          value={context.filter.page === 0 ? 1 : context.filter.page}
          min={1}
          max={maxPage}
          keepWithinRange={true}
          onChange={(v, n) => {
            if (n > maxPage) {
              if (context.filter.page === maxPage) return;
              context.updateFilter({
                page: maxPage,
              });
            } else if (n < 1) {
              context.updateFilter({ page: 1 });
            } else {
              context.updateFilter({
                page: n,
              });
            }
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Text> / {maxPage}</Text>
        <Button
          disabled={context.filter.page >= maxPage}
          onClick={() => {
            context.updateFilter({ page: context.filter.page + 1 });
          }}
        >
          Next Page
        </Button>
      </Stack>
      <Drawer
        isOpen={context.filterOpen}
        placement="left"
        onClose={() => context.setFilterOpen(false)}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              fontWeight="bold"
              borderBottom="1px"
              textAlign="center"
            >
              Filter Settings
            </DrawerHeader>
            <DrawerBody>
              <Stack direction="column">
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Sort By Time:
                </Text>
                <ButtonGroup
                  justifyContent="center"
                  variant="outline"
                  spacing={6}
                >
                  <Button
                    backgroundColor={
                      context.filter.time === "ASC"
                        ? theme.colors.blue[100]
                        : "unset"
                    }
                    colorScheme="blue"
                    onClick={() => context.updateFilter({ time: "ASC" })}
                  >
                    ASC
                  </Button>
                  <Button
                    backgroundColor={
                      context.filter.time === "DESC"
                        ? theme.colors.blue[100]
                        : "unset"
                    }
                    colorScheme="blue"
                    onClick={() => context.updateFilter({ time: "DESC" })}
                  >
                    DESC
                  </Button>
                </ButtonGroup>
                <Divider marginTop={2} />
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Sort By Status:
                </Text>
                <Stack direction="column">
                  <Stack direction="row" align="center" justify="space-around">
                    <Button
                      variant="outline"
                      backgroundColor={
                        context.filter.status === AlertStatus.ALL
                          ? theme.colors.blackAlpha[100]
                          : "unset"
                      }
                      colorScheme="black"
                      onClick={() =>
                        context.updateFilter({ status: AlertStatus.ALL })
                      }
                    >
                      Show All
                    </Button>
                    <Button
                      variant="outline"
                      backgroundColor={
                        context.filter.status === AlertStatus.ACKNOWLEDGED
                          ? theme.colors.green[100]
                          : "unset"
                      }
                      colorScheme="green"
                      onClick={() =>
                        context.updateFilter({
                          status: AlertStatus.ACKNOWLEDGED,
                        })
                      }
                    >
                      Acknowledged
                    </Button>
                  </Stack>
                  <Stack direction="row" align="center" justify="space-around">
                    <Button
                      variant="outline"
                      backgroundColor={
                        context.filter.status === AlertStatus.UNACKNOWLEDGED
                          ? theme.colors.blue[100]
                          : "unset"
                      }
                      colorScheme="blue"
                      onClick={() =>
                        context.updateFilter({
                          status: AlertStatus.UNACKNOWLEDGED,
                        })
                      }
                    >
                      Un-Acknowledged
                    </Button>
                    <Button
                      variant="outline"
                      backgroundColor={
                        context.filter.status === AlertStatus.DECLINED
                          ? theme.colors.red[100]
                          : "unset"
                      }
                      colorScheme="red"
                      onClick={() =>
                        context.updateFilter({
                          status: AlertStatus.DECLINED,
                        })
                      }
                    >
                      Declined
                    </Button>
                  </Stack>
                </Stack>
                <Divider marginTop={2} />
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Search By Application ID:
                </Text>
                <Input
                  textAlign="center"
                  maxLength={3}
                  value={context.filter.applicationID}
                  onChange={(event) =>
                    context.updateFilter({
                      applicationID: event.target.value,
                    })
                  }
                  placeholder="ABC"
                />
                <Divider marginTop={2} />
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Search By Hostname:
                </Text>
                <Input
                  textAlign="center"
                  value={context.filter.hostname}
                  onChange={(event) =>
                    context.updateFilter({
                      hostname: event.target.value,
                    })
                  }
                  placeholder="Hostname"
                />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Stack>
  );
};

export default EntryFilter;
