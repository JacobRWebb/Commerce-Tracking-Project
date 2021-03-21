import { Divider, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  theme,
} from "@chakra-ui/react";
import React, { Component } from "react";
import { MasterState, _MasterContext } from "../context/MasterContext";
import { AlertStatus } from "./Entry";

export interface Filter {
  time: "ASC" | "DESC";
  status: AlertStatus;
  extended: boolean;
  offset: number;
  take: number;
  hostname: string;
  applicationID: string;
  page: number;
}

interface Props {}
interface State {
  open: boolean;
}

export default class TableOptions extends Component<Props, State> {
  static contextType = _MasterContext;

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const context: MasterState = this.context;
    const maxPage = Math.ceil(
      context.AlertState.rows / context.AlertState.filter.take
    );

    return (
      <>
        <Stack direction="column" display="inline-flex">
          <Stack
            borderRadius={3}
            padding={2}
            backgroundColor={theme.colors.gray[200]}
            direction="row"
            justify="space-between"
          >
            <Button
              colorScheme="blue"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              Filter
            </Button>
            <Button
              colorScheme="green"
              onClick={() => context.AlertState.fetchEntries()}
            >
              Refresh
            </Button>
          </Stack>
          <Drawer
            isOpen={this.state.open}
            placement="left"
            onClose={() => this.setState({ open: false })}
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                  fontWeight="bold"
                  borderBottomWidth="1px"
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
                      spacing="6"
                    >
                      <Button
                        backgroundColor={
                          context.AlertState.filter.time === "ASC"
                            ? theme.colors.blue[100]
                            : "unset"
                        }
                        colorScheme="blue"
                        onClick={() =>
                          context.AlertState.updateFilter({ time: "ASC" })
                        }
                      >
                        ASC
                      </Button>
                      <Button
                        backgroundColor={
                          context.AlertState.filter.time === "DESC"
                            ? theme.colors.blue[100]
                            : "unset"
                        }
                        colorScheme="blue"
                        onClick={() =>
                          context.AlertState.updateFilter({ time: "DESC" })
                        }
                      >
                        DESC
                      </Button>
                    </ButtonGroup>
                  </Stack>
                  <Divider marginTop={2} />
                  <Text fontSize="xl" textAlign="center" marginBottom={4}>
                    Sort By Status:
                  </Text>
                  <Stack direction="column">
                    <Stack
                      direction="row"
                      align="center"
                      justify="space-around"
                    >
                      <Button
                        variant="outline"
                        backgroundColor={
                          context.AlertState.filter.status === AlertStatus.ALL
                            ? theme.colors.blackAlpha[100]
                            : "unset"
                        }
                        colorScheme="black"
                        onClick={() =>
                          context.AlertState.updateFilter({
                            status: AlertStatus.ALL,
                          })
                        }
                      >
                        Show All
                      </Button>
                      <Button
                        variant="outline"
                        backgroundColor={
                          context.AlertState.filter.status ===
                          AlertStatus.ACKNOWLEDGED
                            ? theme.colors.green[100]
                            : "unset"
                        }
                        colorScheme="green"
                        onClick={() =>
                          context.AlertState.updateFilter({
                            status: AlertStatus.ACKNOWLEDGED,
                          })
                        }
                      >
                        Acknowledged
                      </Button>
                    </Stack>
                    <Stack
                      direction="row"
                      align="center"
                      justify="space-around"
                    >
                      <Button
                        variant="outline"
                        backgroundColor={
                          context.AlertState.filter.status ===
                          AlertStatus.UNACKNOWLEDGED
                            ? theme.colors.blue[100]
                            : "unset"
                        }
                        colorScheme="blue"
                        onClick={() =>
                          context.AlertState.updateFilter({
                            status: AlertStatus.UNACKNOWLEDGED,
                          })
                        }
                      >
                        Un-Acknowledged
                      </Button>
                      <Button
                        variant="outline"
                        backgroundColor={
                          context.AlertState.filter.status ===
                          AlertStatus.DECLINED
                            ? theme.colors.red[100]
                            : "unset"
                        }
                        colorScheme="red"
                        onClick={() =>
                          context.AlertState.updateFilter({
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
                    Search By Hostname:
                  </Text>
                  <Input
                    textAlign="center"
                    value={context.AlertState.filter.hostname}
                    onChange={(event) =>
                      context.AlertState.updateFilter({
                        hostname: event.target.value,
                      })
                    }
                    placeholder="Hostname"
                  />
                  <Divider marginTop={2} />
                  <Text fontSize="xl" textAlign="center" marginBottom={4}>
                    Search By Application ID:
                  </Text>
                  <Input
                    textAlign="center"
                    maxLength={3}
                    value={context.AlertState.filter.applicationID}
                    onChange={(event) =>
                      context.AlertState.updateFilter({
                        applicationID: event.target.value,
                      })
                    }
                    placeholder="ABC"
                  />
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
          <Stack
            display={context.AlertState.entries.length >= 1 ? "flex" : "none"}
            direction="row"
            justify="flex-end"
            align="center"
          >
            <Button
              disabled={context.AlertState.filter.page <= 1}
              onClick={() => {
                context.AlertState.updateFilter({
                  page: context.AlertState.filter.page - 1,
                  offset: Math.floor(
                    context.AlertState.filter.take *
                      (context.AlertState.filter.page - 2)
                  ),
                });
              }}
            >
              Last Page
            </Button>
            <NumberInput
              width={100}
              defaultValue={context.AlertState.filter.page}
              value={
                context.AlertState.filter.page === 0
                  ? 1
                  : context.AlertState.filter.page
              }
              min={1}
              max={maxPage}
              keepWithinRange={true}
              onChange={(v, n) => {
                if (n > maxPage) {
                  if (context.AlertState.filter.page === maxPage) return;
                  context.AlertState.updateFilter({
                    page: Math.ceil(maxPage),
                    offset: Math.floor(
                      context.AlertState.filter.take * (maxPage - 1)
                    ),
                  });
                } else if (n < 1) {
                  context.AlertState.updateFilter({
                    page: 1,
                    offset: Math.floor(
                      context.AlertState.filter.take * (1 - 1)
                    ),
                  });
                } else {
                  context.AlertState.updateFilter({
                    page: n,
                    offset: Math.floor(
                      context.AlertState.filter.take * (n - 1)
                    ),
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
            <Text>{`/ ${maxPage}`}</Text>
            <Button
              disabled={context.AlertState.filter.page >= maxPage}
              onClick={() => {
                context.AlertState.updateFilter({
                  page: context.AlertState.filter.page + 1,
                  offset: Math.floor(25 * context.AlertState.filter.page),
                });
              }}
            >
              Next Page
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }
}
