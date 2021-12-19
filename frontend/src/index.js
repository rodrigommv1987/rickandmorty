import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "normalize.css";
import "./css/index.css";

import App from "./components/App";
import configStore from "./redux/configStore";

const reduxStore = configStore();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("app")
);
