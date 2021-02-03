import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Homepage from "./components/pages/Homepage";
import { Background } from "./components/pages/Layout";
import Login from "./components/pages/Login";
import Toggle from "./components/Toggle";

function App() {
  return (
    <ChakraProvider>
      <Background>
        <Box
          className="App"
          overflowX="scroll"
          overflowY="hidden"
          height="100%"
          width="100%"
          minHeight="100vh"
          minWidth="100vw"
        >
          <Router>
            <Switch>
              <Route path="/" exact component={Homepage} />
              <Route path="/login" component={Login} />
              <Redirect to="/" />
            </Switch>
          </Router>
          <Toggle />
        </Box>
      </Background>
    </ChakraProvider>
  );
}

export default App;
