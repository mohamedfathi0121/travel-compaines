import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TripProvider } from "./context/TripContext";
import './index.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TripProvider>
      <App />
    </TripProvider>
  </React.StrictMode>
);