import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import store from "./redux/store";

import App from "./App";

import "./index.css";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.querySelector("#root")
);
