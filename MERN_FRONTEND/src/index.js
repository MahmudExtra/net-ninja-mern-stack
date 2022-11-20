import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutProvider>
        <App />
      </WorkoutProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
