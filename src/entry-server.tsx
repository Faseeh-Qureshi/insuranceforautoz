import { renderToString } from "react-dom/server";
import App from "./App";
import { SITE_CONFIG } from "./config/site";
import {
  SEO_ROUTES,
  buildRouteJsonLd,
  type SeoRouteMeta,
} from "./seo/routes";

function toSchemaTel(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1-${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  }
  return e164;
}

export interface RenderedStaticPage {
  route: SeoRouteMeta;
  appHtml: string;
  jsonLd: Record<string, unknown>;
  siteOrigin: string;
  fullPhoneDisplay: string;
}

export function renderAllStaticPages(): RenderedStaticPage[] {
  const siteOrigin = SITE_CONFIG.siteOrigin.replace(/\/+$/, "");
  const schemaTel = toSchemaTel(SITE_CONFIG.phone.e164);
  const fullPhoneDisplay = SITE_CONFIG.phone.fullDisplay;

  return SEO_ROUTES.map((route) => {
    const appHtml = renderToString(<App initialPath={route.path} />);
    const jsonLd = buildRouteJsonLd(route, {
      siteOrigin,
      schemaTel,
      fullPhoneDisplay,
      streetAddress: SITE_CONFIG.address.line1,
      cityStateZip: SITE_CONFIG.address.line2,
    });

    return {
      route,
      appHtml,
      jsonLd,
      siteOrigin,
      fullPhoneDisplay,
    };
  });
}

export { SEO_ROUTES, SITE_CONFIG };
