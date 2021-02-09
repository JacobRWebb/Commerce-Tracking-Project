import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  theme,
  useColorMode,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import lodash from "lodash";
import React, { Component } from "react";
import { API_DOMAIN } from "../../util/consts";
import AlertCard, { IAlert } from "./AlertCard";
import AlertModal from "./AlertModal";
import Pagination from "./Pagination";

interface Props {
  extended?: boolean;
}
interface State {
  alerts: IAlert[];
  modalAlert?: IAlert;
  extended: boolean;
  filter: 0 | 1 | 2;
  filterOpen: boolean;
  error: boolean;
  meta: {
    rows: number;
    rowsPerPage: number;
    page: number;
    totalPages: number;
    offset: number;
  };
}

export default class AlertList extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      alerts: [],
      extended: this.props.extended || false,
      filter: 2,
      filterOpen: false,
      error: false,
      meta: {
        rows: 0,
        rowsPerPage: 50, // Default
        page: 1,
        totalPages: 2,
        offset: 0,
      },
    };

    this.getAlerts = lodash.debounce(this.getAlerts, 150);
    this.setPage = lodash.debounce(this.setPage, 80);
  }

  componentDidMount() {
    this._AlertBuffer();
  }

  getAlerts = () => this._AlertBuffer();

  setPage = (page: number) => {
    this.setState(
      (prevState) => ({
        meta: {
          ...prevState.meta,
          page,
          offset: Math.floor(this.state.meta.rowsPerPage * (page - 1)),
        },
      }),
      () => this.getAlerts()
    );
  };

  _AlertBuffer = () => {
    this.setState({ error: false });
    fetch(`${API_DOMAIN}/alert`, {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.success) {
          this.setState((prevState) => ({
            alerts: data.alerts,
            meta: {
              ...prevState.meta,
              rows: data.count,
              rowsPerPage: data.rowsPerPage,
              totalPages: Math.ceil(data.count / data.rowsPerPage),
            },
          }));
          this.setState({ alerts: data.alerts });
        } else {
          throw new Error("Something went wrong.");
        }
      })
      .catch((err) => {
        this.setState({ error: true });
        console.log("Error Occured in _AlertBuffer");
        console.log(err);
      });
  };

  render() {
    if (this.state.error) {
      return <Heading>There has been an error while fetching alerts</Heading>;
    }
    return (
      <>
        <>
          <Wrap
            align="center"
            textAlign="center"
            justify={["center", "space-between"]}
          >
            <WrapItem>
              <Heading>
                {this.props.extended
                  ? "Admin Mode - Viewing All Alerts"
                  : "Viewing Alert List"}
              </Heading>
            </WrapItem>
            <WrapItem>
              <Button
                onClick={() =>
                  this.setState({ filterOpen: !this.state.filterOpen })
                }
              >
                <SearchIcon marginRight={1} />
                Filter
              </Button>
            </WrapItem>
          </Wrap>
          <Box
            display={this.state.filterOpen ? "block" : "none"}
            width="100%"
            marginTop={4}
          >
            <Stack
              spacing={5}
              justify="space-around"
              direction={["column", "row"]}
            >
              <FilterButton
                change={() =>
                  this.setState({ filter: 2 }, () => this.getAlerts())
                }
                color={theme.colors.gray[500]}
              >
                View Both
              </FilterButton>
              <FilterButton
                change={() =>
                  this.setState({ filter: 1 }, () => this.getAlerts())
                }
                color={theme.colors.green[200]}
              >
                Acknowledged
              </FilterButton>
              <FilterButton
                change={() =>
                  this.setState({ filter: 0 }, () => this.getAlerts())
                }
                color={theme.colors.red[200]}
              >
                Un-Acknowledged
              </FilterButton>
            </Stack>
          </Box>
          {this.state.alerts.length > 0 && (
            <Pagination
              page={this.state.meta.page}
              totalPages={this.state.meta.totalPages}
              rows={this.state.meta.rows}
              setPage={this.setPage}
            />
          )}
          <SimpleGrid
            marginTop={8}
            spacing={[5, 5, 6, 6, 10]}
            columns={[1, 2, 3, 3, 4, 5]}
          >
            {this.state.alerts?.map((alert) => {
              return (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  openModal={(alert: IAlert) =>
                    this.setState({ modalAlert: alert })
                  }
                />
              );
            })}
          </SimpleGrid>
        </>
        {this.state.modalAlert && (
          <AlertModal
            alert={this.state.modalAlert}
            isOpen={true}
            onClose={() => this.setState({ modalAlert: undefined })}
          />
        )}
      </>
    );
  }
}

const FilterButton: React.FC<{ color: string; change: () => void }> = ({
  children,
  color,
  change,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      overflow="hidden"
      variant="outline"
      onClick={() => change()}
      backgroundColor={colorMode === "light" ? "white" : "black"}
      color={color}
    >
      {children}
    </Button>
  );
};
