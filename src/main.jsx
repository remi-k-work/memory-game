import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// game context
import { GameProvider } from "./js/GameContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </React.StrictMode>
);
