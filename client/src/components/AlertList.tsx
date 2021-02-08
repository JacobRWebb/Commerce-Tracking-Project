import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import React, { Component } from "react";
import { API_DOMAIN } from "../util/consts";
import AlertCard, { IAlert } from "./AlertCard";

interface Props {}

interface State {
  alerts: IAlert[];
  filter: 0 | 1 | 2;
  filterOpen: boolean;
  meta: {
    count: number;
    page: number;
    perPage: number;
    skip: number;
  };
}

export default class AlertList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      alerts: [],
      filter: 2,
      filterOpen: false,
      meta: {
        count: 0,
        page: 0,
        perPage: 100, // By Default
        skip: 0,
      },
    };
  }

  componentDidMount() {
    this.fetchAlerts();
  }

  fetchAlerts = () => {
    fetch(`${API_DOMAIN}/alert`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        filter: this.state.filter,
        skip: this.state.meta.skip,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.success && data.alerts) {
          this.setState((prevState) => ({
            alerts: data.alerts,
            meta: {
              ...prevState.meta,
              count: data.count,
              perPage: data.perPage,
            },
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changePage = (selectedItem: { selected: number }) => {
    this.setState(
      (prevState) => ({
        meta: {
          ...prevState.meta,
          page: selectedItem.selected,
          skip: Math.floor(this.state.meta.perPage * selectedItem.selected),
        },
      }),
      () => {
        this.fetchAlerts();
      }
    );
  };

  render() {
    return (
      <>
        <AlertHeading
          toggle={() => this.setState({ filterOpen: !this.state.filterOpen })}
        >
          <AlertFilterList
            filterOpen={this.state.filterOpen}
            toggle={(filter: 0 | 1 | 2) =>
              this.setState({ filter }, () => {
                this.fetchAlerts();
              })
            }
          />
        </AlertHeading>
        <SimpleGrid
          marginTop={8}
          spacing={[5, 5, 6, 6, 10]}
          columns={[1, 2, 3, 3, 4, 5]}
        >
          <DisplayAlerts alerts={this.state.alerts} />
        </SimpleGrid>
      </>
    );
  }
}

const AlertHeading: React.FC<{ toggle: () => void }> = ({
  children,
  toggle,
}) => {
  return (
    <Box>
      <Stack justify="space-between" direction="row">
        <Heading>Viewing Alert List</Heading>
        <Button onClick={toggle}>
          <SearchIcon marginRight={1} />
          Filter
        </Button>
      </Stack>
      {children}
    </Box>
  );
};

const AlertFilterList: React.FC<{
  filterOpen: boolean;
  toggle: (filter: 0 | 1 | 2) => void;
}> = ({ children, filterOpen, toggle }) => {
  const { colorMode } = useColorMode();
  return (
    <Box display={filterOpen ? "block" : "none"} width="100%" marginTop={4}>
      <Stack spacing={5} justify="space-evenly" direction={["column", "row"]}>
        <Button
          backgroundColor={colorMode === "light" ? "white" : "black"}
          variant="outline"
          onClick={() => toggle(2)}
          color={theme.colors.gray[500]}
        >
          View Both
        </Button>
        <Button
          backgroundColor={colorMode === "light" ? "white" : "black"}
          variant="outline"
          onClick={() => toggle(1)}
          color={theme.colors.green[200]}
        >
          View Acknowledged
        </Button>
        <Button
          backgroundColor={colorMode === "light" ? "white" : "black"}
          variant="outline"
          onClick={() => toggle(0)}
          color={theme.colors.red[200]}
        >
          View Un-Acknowledged
        </Button>
      </Stack>
    </Box>
  );
};

const DisplayAlerts: React.FC<{ alerts: IAlert[] }> = ({ alerts }) => {
  return (
    <>
      {alerts.map((alert) => {
        return <AlertCard key={alert.id} alert={alert} />;
      })}
    </>
  );
};
