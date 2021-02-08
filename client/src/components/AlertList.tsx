import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
        page: 1,
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

  changePage = (newPage: number) => {
    this.setState(
      (prevState) => ({
        meta: {
          ...prevState.meta,
          page: newPage,
          skip: Math.floor(this.state.meta.perPage * (newPage - 1)),
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
        {this.state.alerts.length > 0 && (
          <PageList
            count={this.state.meta.count}
            page={this.state.meta.page}
            perPage={this.state.meta.perPage}
            setPage={this.changePage}
          />
        )}
        <SimpleGrid
          marginTop={8}
          spacing={[5, 5, 6, 6, 10]}
          columns={[1, 2, 3, 3, 4, 5]}
        >
          <DisplayAlerts alerts={this.state.alerts} />
        </SimpleGrid>
        {this.state.alerts.length > 0 && (
          <PageList
            count={this.state.meta.count}
            page={this.state.meta.page}
            perPage={this.state.meta.perPage}
            setPage={this.changePage}
          />
        )}
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
      <Stack justify="space-between" direction={["column", "row"]}>
        <Heading textAlign={["center", "left"]}>Viewing Alert List</Heading>
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

const PageList: React.FC<{
  page: number;
  count: number;
  perPage: number;
  setPage: (page: number) => void;
}> = ({ page, perPage, count, setPage }) => {
  const totalPages = Math.ceil(count / perPage);
  return (
    <Stack
      paddingTop={4}
      paddingBottom={4}
      direction={["column", "row"]}
      justify="space-evenly"
    >
      <Button isDisabled={page <= 1} onClick={() => setPage(page - 1)}>
        Previous
      </Button>
      <NumberInput
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
      <Button isDisabled={page >= totalPages} onClick={() => setPage(page + 1)}>
        Next
      </Button>
    </Stack>
  );
};
