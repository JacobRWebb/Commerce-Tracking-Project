import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MasterContext from "./components/context/MasterContext";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <MasterContext>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </MasterContext>
  </React.StrictMode>,
  document.getElementById("root")
);
