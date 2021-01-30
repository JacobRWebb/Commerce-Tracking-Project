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
import { RiFilterLine } from "react-icons/ri";
import { API_DOMAIN } from "../util/consts";
import AlertCard, { IAlert } from "./AlertCard";

interface IAlertList {
  alerts: IAlert[];
  filter: 0 | 1 | 2;
  options: boolean;
}

export default class AlertList extends Component<{}, IAlertList> {
  constructor(props: any) {
    super(props);
    this.state = {
      alerts: [],
      filter: 2,
      options: false,
    };
  }

  componentDidMount() {
    fetch(`${API_DOMAIN}/alerts`)
      .then((result) => result.json())
      .then((data) => {
        if (data.alerts) {
          this.setState({ alerts: data.alerts });
        }
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <AlertListHead
          options={this.state.options}
          toggleOptions={() => this.setState({ options: !this.state.options })}
        >
          <FilterOptions
            toggle={(selectedFilter: 0 | 1 | 2) =>
              this.setState({ filter: selectedFilter })
            }
            options={this.state.options}
          />
        </AlertListHead>
        <SimpleGrid
          marginTop={8}
          spacing={[5, 5, 6, 10]}
          columns={[1, 2, 3, 4]}
        >
          <FilteredList alerts={this.state.alerts} filter={this.state.filter} />
        </SimpleGrid>
      </>
    );
  }
}

const AlertListHead: React.FC<{
  options: boolean;
  toggleOptions: () => void;
}> = ({ options, toggleOptions, children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box>
      <Box
        bgColor={colorMode === "light" ? "white" : "transparent"}
        display="inline-block"
        borderRadius={3}
      >
        <Heading>
          Viewing Alert Listings
          <Button marginLeft={5} onClick={toggleOptions}>
            <RiFilterLine /> Filter
          </Button>
        </Heading>
      </Box>
      {children}
    </Box>
  );
};

const FilterOptions: React.FC<{
  options: boolean;
  toggle: (selectedFilter: 0 | 1 | 2) => void;
}> = ({ options, toggle }) => {
  const { colorMode } = useColorMode();
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
        <Button
          backgroundColor={colorMode === "light" ? "white" : "black"}
          variant="outline"
          _hover={{}}
          onClick={() => toggle(2)}
        >
          Filter Both
        </Button>
        <Button
          backgroundColor={colorMode === "light" ? "white" : "black"}
          variant="outline"
          _hover={{}}
          onClick={() => toggle(1)}
          colorScheme={theme.colors.green[200]}
          color={theme.colors.green[200]}
        >
          Acknowledged
        </Button>
        <Button
          backgroundColor={colorMode === "light" ? "white" : "black"}
          variant="outline"
          _hover={{}}
          onClick={() => toggle(0)}
          color={theme.colors.red[300]}
          colorScheme={theme.colors.red[300]}
        >
          Un-Acknowledged
        </Button>
      </Stack>
    </Box>
  );
};

const FilteredList: React.FC<{ alerts: IAlert[]; filter: 0 | 1 | 2 }> = ({
  alerts,
  filter,
}) => {
  return (
    <>
      {alerts.map((alert) => {
        if (filter === 2 || filter === alert.status) {
          return <AlertCard key={alert.id} alert={alert} />;
        } else {
          return null;
        }
      })}
    </>
  );
};
