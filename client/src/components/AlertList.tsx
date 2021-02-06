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
import ReactPaginate from "react-paginate";
import { API_DOMAIN } from "../util/consts";
import AlertCard, { IAlert } from "./AlertCard";

interface IAlertList {
  alerts: IAlert[];
  filter: 0 | 1 | 2;
  options: boolean;
  perPage: number;
  count: number;
  skip: number;
  page: number;
}

export default class AlertList extends Component<{}, IAlertList> {
  constructor(props: any) {
    super(props);
    this.state = {
      alerts: [],
      filter: 2,
      options: false,
      perPage: 0,
      count: 0,
      skip: 0,
      page: 0,
    };
  }

  componentDidMount() {
    this.getAlerts();
  }

  changePage = (selectedItem: { selected: number }) => {
    this.setState(
      {
        page: selectedItem.selected,
        skip: Math.floor(this.state.perPage * selectedItem.selected),
      },
      () => {
        this.getAlerts();
      }
    );
  };

  changeFilter = (filter: 0 | 1 | 2) => {
    this.setState({ filter }, () => {
      this.getAlerts();
    });
  };

  getAlerts = () => {
    fetch(`${API_DOMAIN}/alert`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        filter: this.state.filter,
        skip: this.state.skip,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.success && data.alerts) {
          console.log(data);
          this.setState({
            alerts: data.alerts,
            count: data.count,
            perPage: data.perPage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        <AlertListHead
          toggleOptions={() => this.setState({ options: !this.state.options })}
        >
          <FilterOptions
            toggle={this.changeFilter}
            options={this.state.options}
          />
        </AlertListHead>
        <ReactPaginate
          pageCount={Math.ceil(this.state.count / this.state.perPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={this.changePage}
        />
        <SimpleGrid
          marginTop={8}
          spacing={[5, 5, 6, 6, 10]}
          columns={[1, 2, 3, 3, 4, 5]}
        >
          <FilteredList alerts={this.state.alerts} filter={this.state.filter} />
        </SimpleGrid>
      </>
    );
  }
}

const AlertListHead: React.FC<{
  toggleOptions: () => void;
}> = ({ toggleOptions, children }) => {
  return (
    <Box>
      <Stack justify="space-between" direction="row">
        <Heading>Viewing Alert Listings</Heading>
        <Button onClick={toggleOptions} overflow="hidden">
          <SearchIcon marginRight={1} /> Filter
        </Button>
      </Stack>
      {children}
    </Box>
  );
};

const FilterOptions: React.FC<{
  options: boolean;
  toggle: (selectedFilter: 0 | 1 | 2) => void;
}> = ({ options, toggle }) => {
  return (
    <Box
      display={options ? "block" : "none"}
      width="100%"
      marginTop={4}
      borderRadius={3}
      paddingTop={2}
      paddingBottom={2}
    >
      <Stack spacing={5} justify="space-evenly" direction={["column", "row"]}>
        <FilterOptionButton
          func={toggle}
          value={2}
          color={theme.colors.gray[500]}
        >
          Filter Both
        </FilterOptionButton>
        <FilterOptionButton
          func={toggle}
          value={1}
          color={theme.colors.green[200]}
        >
          Acknowledged
        </FilterOptionButton>
        <FilterOptionButton
          func={toggle}
          value={0}
          color={theme.colors.red[200]}
        >
          Un-Acknowledged
        </FilterOptionButton>
      </Stack>
    </Box>
  );
};

const FilterOptionButton: React.FC<{
  func: (value: any) => void;
  value: any;
  color?: string;
}> = ({ children, func, value, color = "black" }) => {
  const { colorMode } = useColorMode();
  return (
    <Button
      backgroundColor={colorMode === "light" ? "white" : "black"}
      variant="outline"
      onClick={() => func(value)}
      color={color}
      colorScheme={color}
    >
      {children}
    </Button>
  );
};

const FilteredList: React.FC<{ filter: number; alerts: IAlert[] }> = ({
  filter,
  alerts,
}) => {
  return (
    <>
      {alerts.map((alert) => {
        if (filter === 2 || filter === alert.currentState) {
          return <AlertCard key={alert.id} alert={alert} />;
        } else {
          return null;
        }
      })}
    </>
  );
};
