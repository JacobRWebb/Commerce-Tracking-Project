import { Box, Stack, Text } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import theme from "@chakra-ui/theme";
import React, { Component } from "react";
import { MasterState, _MasterContext } from "../context/MasterContext";
import Entry, { IEntry } from "./Entry";

interface Props {}
interface State {
  entries: IEntry[];
}

export default class TableList extends Component<Props, State> {
  static contextType = _MasterContext;

  constructor(props: any, context: MasterState) {
    super(props);
    context.AlertState.fetchEntries();
    this.state = {
      entries: [],
    };
  }

  shouldComponentUpdate() {
    const context: MasterState = this.context;
    if (
      !context.AlertState.filter.extended &&
      window.location.pathname === "/admin"
    )
      context.AlertState.updateFilter({ extended: true });
    else if (
      context.AlertState.filter.extended &&
      window.location.pathname !== "/admin"
    )
      context.AlertState.updateFilter({ extended: false });
    return true;
  }

  render() {
    const context: MasterState = this.context;
    if (context.AlertState.isFetching) {
      return (
        <SkeletonText spacing={6} noOfLines={10}>
          placeholder
        </SkeletonText>
      );
    }

    if (context.AlertState.entries.length < 1) {
      return (
        <Box
          backgroundColor={theme.colors.gray[200]}
          padding={2}
          borderRadius={3}
        >
          <Text textAlign="center" fontSize="2xl">
            No results were found. Try changing your filter settings.
          </Text>
        </Box>
      );
    }

    return (
      <Box paddingBottom={10}>
        <Stack direction="column" spacing={3}>
          {context.AlertState.entries.map((entry, index) => {
            return (
              <Entry
                key={entry.id}
                index={index}
                entry={entry}
                changeModal={context.AlertState.changeEntry}
              />
            );
          })}
        </Stack>
      </Box>
    );
  }
}
