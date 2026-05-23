import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

// Fixed default theme (dark hero + light sections via layout)
document.documentElement.dataset.theme = "dark";
document.documentElement.classList.remove("light");
document.documentElement.style.colorScheme = "dark";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
