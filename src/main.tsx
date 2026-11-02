import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;

if (rootEl.firstElementChild) {
  hydrateRoot(rootEl, <App initialPath={window.location.pathname} />);
} else {
  createRoot(rootEl).render(<App initialPath={window.location.pathname} />);
}
