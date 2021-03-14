import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth } from "./components/context";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Auth>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Auth>
  </React.StrictMode>,
  document.getElementById("root")
);
