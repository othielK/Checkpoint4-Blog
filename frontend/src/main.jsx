import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ExportContext from "./contexts/Context";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <ExportContext.Provider>
        <App />
      </ExportContext.Provider>
    </Router>
  </React.StrictMode>
);
