import React from "react";
import ReactDOM from "react-dom";

import { createBrowserHistory } from "history";
import { wrapHistory } from "oaf-react-router";
import App from "./App";
import "./index.css";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

window.baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const history = createBrowserHistory();
wrapHistory(history);

ReactDOM.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>,
  document.getElementById("root")
);
