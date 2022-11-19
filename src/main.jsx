import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserHistory } from "history";
import { wrapHistory } from "oaf-react-router";
import App from "./App";
import "./index.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

const history = createBrowserHistory();
wrapHistory(history);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </React.StrictMode>
);
