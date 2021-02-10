import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/theme";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";
import axios from "axios";

axios.defaults.baseURL =
  "https://europe-west1-portfolio-taurlift.cloudfunctions.net/api";

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
