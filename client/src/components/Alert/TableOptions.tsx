import { Box, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  ButtonGroup,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  theme,
} from "@chakra-ui/react";
import React, { Component } from "react";
import { AlertContext, AlertState } from "../context";
import { AlertStatus } from "./Entry";

interface Props {}
interface State {
  open: boolean;
}

export default class TableOptions extends Component<Props, State> {
  static contextType = AlertContext;
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const context: AlertState = this.context;

    return (
      <>
        <Stack
          direction="column"
          padding={2}
          borderRadius={3}
          backgroundColor={theme.colors.gray[200]}
        >
          <Stack direction="row" justify="space-between">
            <Button
              colorScheme="blue"
              onClick={() => this.setState({ open: !this.state.open })}
            >
              Filter
            </Button>
            <Button onClick={() => context.fetchAlerts()} colorScheme="green">
              Refresh
            </Button>
          </Stack>
          <Box display={this.state.open ? "block" : "none"}>
            <Stack direction={["column", "row"]}>
              <Box
                backgroundColor="white"
                padding={1}
                borderRadius={5}
                borderColor={theme.colors.gray[500]}
                borderWidth={1}
              >
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Sort By Time:
                </Text>
                <ButtonGroup variant="outline" spacing="6">
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
              </Box>
              <Box
                backgroundColor="white"
                padding={1}
                borderRadius={5}
                borderColor={theme.colors.gray[500]}
                borderWidth={1}
              >
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Sort By Status:
                </Text>
                <Stack direction={["column", "column", "column", "row"]}>
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
                      context.updateFilter({ status: AlertStatus.ACKNOWLEDGED })
                    }
                  >
                    Acknowledged
                  </Button>
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
                      context.updateFilter({ status: AlertStatus.DECLINED })
                    }
                  >
                    Declined
                  </Button>
                </Stack>
              </Box>
              <Box
                backgroundColor="white"
                padding={1}
                borderRadius={5}
                borderColor={theme.colors.gray[500]}
                borderWidth={1}
              >
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Search By Hostname:
                </Text>
                <Input
                  value={context.filter.hostname}
                  onChange={(event) =>
                    context.updateFilter({ hostname: event.target.value })
                  }
                  placeholder="Hostname"
                />
              </Box>
              <Box
                backgroundColor="white"
                padding={1}
                borderRadius={5}
                borderColor={theme.colors.gray[500]}
                borderWidth={1}
              >
                <Text fontSize="xl" textAlign="center" marginBottom={4}>
                  Temporary Admin View
                </Text>
                <Button
                  backgroundColor={
                    context.filter.extended === true
                      ? theme.colors.red[100]
                      : "unset"
                  }
                  onClick={() =>
                    context.updateFilter({ extended: !context.filter.extended })
                  }
                >
                  Toggle Admin
                </Button>
              </Box>
            </Stack>
            {/* <Button
              marginTop={2}
              onClick={() => context.fetchAlerts()}
              variant="solid"
              colorScheme="facebook"
            >
              Update Filter Search
            </Button> */}
          </Box>
        </Stack>
        {context.entries.length > 1 ? (
          <Stack direction="row" justify="flex-end" align="center">
            <Button
              disabled={context.filter.page <= 1}
              onClick={() => {
                context.updateFilter({
                  page: context.filter.page - 1,
                  offset: Math.floor(25 * (context.filter.page - 2)),
                });
              }}
            >
              Last Page
            </Button>
            <NumberInput
              defaultValue={context.filter.page}
              value={context.filter.page === 0 ? 1 : context.filter.page}
              min={1}
              max={Math.ceil(context.rowCount / context.filter.take)}
              keepWithinRange={true}
              onChange={(v, n) => {
                if (n > Math.ceil(context.rowCount / context.filter.take)) {
                  if (
                    context.filter.page ===
                    Math.ceil(context.rowCount / context.filter.take)
                  )
                    return;
                  context.updateFilter({
                    page: Math.ceil(context.rowCount / context.filter.take),
                    offset: Math.floor(
                      context.filter.take *
                        (Math.ceil(context.rowCount / context.filter.take) - 1)
                    ),
                  });
                } else if (n < 1) {
                  context.updateFilter({
                    page: 1,
                    offset: Math.floor(context.filter.take * (1 - 1)),
                  });
                } else {
                  context.updateFilter({
                    page: n,
                    offset: Math.floor(context.filter.take * (n - 1)),
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
            <Text>/ {Math.ceil(context.rowCount / context.filter.take)}</Text>
            <Button
              disabled={
                context.filter.page >=
                Math.ceil(context.rowCount / context.filter.take)
              }
              onClick={() => {
                context.updateFilter({
                  page: context.filter.page + 1,
                  offset: Math.floor(25 * context.filter.page),
                });
              }}
            >
              Next Page
            </Button>
          </Stack>
        ) : (
          <></>
        )}
      </>
    );
  }
}
