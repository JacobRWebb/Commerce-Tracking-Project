import { Box, Stack, Text } from "@chakra-ui/layout";
import { SkeletonText } from "@chakra-ui/skeleton";
import theme from "@chakra-ui/theme";
import React, { Component } from "react";
import { AlertContext, AlertState } from "../context";
import Entry, { IEntry } from "./Entry";

interface Props {}
interface State {
  entries: IEntry[];
}

export default class TableList extends Component<Props, State> {
  static contextType = AlertContext;
  constructor(props: any, context: AlertState) {
    super(props);
    this.state = {
      entries: context.entries,
    };
  }

  componentDidUpdate() {
    const context: AlertState = this.context;
    if (this.state.entries !== context.entries)
      this.setState({ entries: context.entries });
  }

  shouldComponentUpdate(prevProps: Props, prevState: State) {
    const context: AlertState = this.context;
    if (
      context.filter.extended !==
      (window.location.pathname === "/admin" ? true : false)
    ) {
      context.updateFilter({
        extended: window.location.pathname === "/admin" ? true : false,
      });
    }
    if (prevState.entries !== context.entries) return true;
    return false;
  }

  render() {
    const context: AlertState = this.context;
    if (context.checking) {
      return (
        <SkeletonText spacing={6} noOfLines={10}>
          reee
        </SkeletonText>
      );
    }

    if (!context.checking && context.entries.length < 1) {
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
          {context.entries.map((entry, index) => {
            return (
              <Entry
                key={entry.id}
                index={index}
                entry={entry}
                changeModal={context.changeModalViewing}
              />
            );
          })}
        </Stack>
      </Box>
    );
  }
}
