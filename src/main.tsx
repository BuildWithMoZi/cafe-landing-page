import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@/styles/index.css";

// Apply dark theme before first paint
const stored = localStorage.getItem("belfry-theme");
const theme = stored === "light" ? "light" : "dark";
document.documentElement.dataset.theme = theme;
document.documentElement.classList.toggle("light", theme === "light");
document.documentElement.style.colorScheme = theme;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
