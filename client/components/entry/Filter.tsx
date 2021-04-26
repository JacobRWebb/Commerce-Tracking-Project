import { Box, Divider, Stack, Text } from "@chakra-ui/layout";
import {
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from "@chakra-ui/react";
import React, { FunctionComponent, useContext, useState } from "react";
import { EntryContext } from "../../context/EntryContext";
import { AlertStatus } from "../../interface/IEntry";

const Filter: FunctionComponent = () => {
  const context = useContext(EntryContext);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <Box>
      <Stack direction="row" justify="space-between">
        <Button onClick={() => setFilterOpen(true)} colorScheme="blue">
          Filter
        </Button>
        <Button onClick={() => context.fetchEntries()} colorScheme="blue">
          Refresh
        </Button>
      </Stack>
      <Drawer
        placement="left"
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader
              borderBottomWidth="5px"
              borderBottomColor="green.600"
              color="green.600"
              fontWeight="bold"
              height="50px"
              minHeight="50px"
              maxHeight="50px"
              padding="11px"
              textAlign="center"
            >
              Filter Settings
            </DrawerHeader>
            <DrawerBody>
              <Stack direction="column" spacing="11px">
                <Text fontSize="xl" textAlign="center">
                  Sort By Time:
                </Text>
                <ButtonGroup
                  justifyContent="center"
                  variant="solid"
                  spacing="11px"
                >
                  <Button
                    colorScheme={
                      context.filter.time === "ASC" ? "blackAlpha" : "gray"
                    }
                    onClick={() => context.updateFilter({ time: "ASC" })}
                  >
                    ASC
                  </Button>
                  <Button
                    colorScheme={
                      context.filter.time === "DESC" ? "blackAlpha" : "gray"
                    }
                    onClick={() => context.updateFilter({ time: "DESC" })}
                  >
                    DESC
                  </Button>
                </ButtonGroup>
                <Divider />
                <Text fontSize="xl" textAlign="center">
                  Sort By Status:
                </Text>
                <ButtonGroup
                  justifyContent="center"
                  variant="solid"
                  spacing="11px"
                >
                  <Button
                    onClick={() =>
                      context.updateFilter({ status: AlertStatus.ALL })
                    }
                    colorScheme={
                      context.filter.status === AlertStatus.ALL
                        ? "blackAlpha"
                        : "gray"
                    }
                  >
                    Show All
                  </Button>
                  <Button
                    onClick={() =>
                      context.updateFilter({ status: AlertStatus.ACKNOWLEDGED })
                    }
                    colorScheme={
                      context.filter.status === AlertStatus.ACKNOWLEDGED
                        ? "green"
                        : "gray"
                    }
                  >
                    Acknowledge
                  </Button>
                </ButtonGroup>
                <ButtonGroup
                  justifyContent="center"
                  variant="solid"
                  spacing="11px"
                >
                  <Button
                    onClick={() =>
                      context.updateFilter({
                        status: AlertStatus.UNACKNOWLEDGED,
                      })
                    }
                    colorScheme={
                      context.filter.status === AlertStatus.UNACKNOWLEDGED
                        ? "blue"
                        : "gray"
                    }
                  >
                    Un-Acknowledged
                  </Button>
                  <Button
                    onClick={() =>
                      context.updateFilter({ status: AlertStatus.DECLINED })
                    }
                    colorScheme={
                      context.filter.status === AlertStatus.DECLINED
                        ? "red"
                        : "gray"
                    }
                  >
                    Decline
                  </Button>
                </ButtonGroup>
                <Divider />
                <Text fontSize="xl" textAlign="center">
                  Search By Application ID:
                </Text>
                <Input
                  textAlign="center"
                  maxLength={3}
                  value={context.filter.applicationID}
                  onChange={({ target }) =>
                    context.updateFilter({ applicationID: target.value })
                  }
                  placeholder="ABC"
                />
                <Divider />
                <Text fontSize="xl" textAlign="center">
                  Search By Hostname:
                </Text>
                <Input
                  textAlign="center"
                  value={context.filter.hostname}
                  onChange={({ target }) =>
                    context.updateFilter({ hostname: target.value })
                  }
                  placeholder="Hostname"
                />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Filter;
