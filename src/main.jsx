import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles/themes.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ContentProvider } from "./contexts/ContentContext";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
