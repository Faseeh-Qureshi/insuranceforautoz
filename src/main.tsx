import { startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { loadGuideSwitch } from "./App.tsx";
import { normalizeRoutePath } from "./seo/clientRoutes";
import "./index.css";

const rootEl = document.getElementById("root")!;
const initialPath = window.location.pathname;
const normalized = normalizeRoutePath(initialPath);

async function mountApp() {
  const GuideSwitch = normalized === "/" ? null : await loadGuideSwitch();
  const element = (
    <App initialPath={initialPath} initialGuideSwitch={GuideSwitch} />
  );

  if (rootEl.firstElementChild) {
    startTransition(() => {
      hydrateRoot(rootEl, element);
    });
  } else {
    createRoot(rootEl).render(element);
  }
}

if (!rootEl.firstElementChild) {
  void mountApp();
} else if ("requestIdleCallback" in window) {
  (
    window as Window & {
      requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
    }
  ).requestIdleCallback(() => void mountApp(), { timeout: 1500 });
} else {
  setTimeout(() => void mountApp(), 150);
}
