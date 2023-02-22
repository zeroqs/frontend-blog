import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.scss";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as Element);
const queryClient = new QueryClient()

root.render(
  <QueryClientProvider client={queryClient}>
    <CssBaseline/>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false}/>
  </QueryClientProvider>
);
