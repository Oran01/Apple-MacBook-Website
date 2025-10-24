/**
 * main.jsx
 *
 * Description:
 * Entry point for the React application. It:
 * - Imports global styles (index.css)
 * - Mounts the <App /> component into the root DOM element
 * - Wraps the app in <StrictMode> to enable extra development checks
 *
 * React 18+ uses `createRoot` from 'react-dom/client' for concurrent rendering.
 *
 * Example HTML structure expected:
 * <div id="root"></div>
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Mount the React app to the DOM inside #root
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
