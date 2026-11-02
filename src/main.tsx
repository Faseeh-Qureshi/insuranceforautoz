import { startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App, { loadGuideSwitch } from "./App.tsx";
import { normalizeRoutePath } from "./seo/clientRoutes";
import "./index.css";

declare global {
  interface Window {
    __markHydrated?: () => void;
  }
}

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
      requestAnimationFrame(() => {
        window.__markHydrated?.();
      });
    });
  } else {
    createRoot(rootEl).render(element);
  }
}

void mountApp();
