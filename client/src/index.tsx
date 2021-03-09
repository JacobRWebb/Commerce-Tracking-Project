import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth } from "./components/context";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Auth>
        <App />
      </Auth>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
