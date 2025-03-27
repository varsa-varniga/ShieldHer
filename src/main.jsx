import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CybersecuritySidebar from "./screens/sidebar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <CybersecuritySidebar /> */}
    <App />
  </StrictMode>
);
