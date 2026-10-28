# InsuranceforAutoz.com

Production-ready inbound auto insurance call lead-generation website built with **React 19, Vite 8, TypeScript, and Tailwind CSS v4**, engineered for static edge hosting on **Cloudflare Pages** via GitHub integration.

- **Production Domain:** `https://insuranceforautoz.com`
- **Primary Call Destination:** `+1 (848) 467-1057` (`tel:+18484671057`)
- **Mailing Address:** `7901 4th St N STE 300, St. Petersburg, FL 33702`

---

## 1. Prerequisites

- **Node.js:** `>= 22.12.0` (automatically pinned to `22` via `.nvmrc` and `.node-version` for Cloudflare Pages and local version managers)
- **Package Manager:** `npm` (v10+) or `bun` (v1.2+)

---

## 2. Local Development & Build Commands

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure local environment variables (optional override)**
   A local `.env` (gitignored) and committed `.env.production` (non-secret production defaults) are already wired up. If setting up on a fresh clone:
   ```bash
   cp .env.example .env
   ```

3. **Start the local Vite development server (Port 3000)**
   ```bash
   npm run dev
   ```

4. **Run TypeScript type checking**
   ```bash
   npm run typecheck
   ```

5. **Build the production static site (`dist/`)**
   ```bash
   npm run build
   ```

6. **Run full pre-deploy check (TypeScript + Production Build)**
   ```bash
   npm run check
   ```

7. **Preview the compiled production build locally (Port 4173)**
   ```bash
   npm run preview
   ```

---

## 3. Environment Variables (`VITE_*`)

All site-wide configuration is read at build time from Vite environment variables across both the React application (`src/config/site.ts`) and static SEO/Schema metadata (`index.html`, `robots.txt`, and `sitemap.xml` via `vite.config.ts`).

| Variable | Default Value | Purpose |
| :--- | :--- | :--- |
| `VITE_SITE_URL` | `https://insuranceforautoz.com` | Canonical site origin (no trailing slash). Updates canonical tags, Open Graph image URLs, JSON-LD IDs, `robots.txt`, and `sitemap.xml`. |
| `VITE_CALL_PHONE_E164` | `+18484671057` | Inbound call phone number in E.164 format. Automatically formats all CTA labels (`(848) 467-1057` / `+1 (848) 467-1057`), `tel:` links, meta descriptions, and Schema `ContactPoint`. |
| `VITE_COMPANY_ADDRESS_LINE1` | `7901 4th St N STE 300` | Street and suite line displayed in footer, disclosure modal, and Schema `PostalAddress`. |
| `VITE_COMPANY_ADDRESS_LINE2` | `St. Petersburg, FL 33702` | City, state, and ZIP displayed in footer and disclosure modal. |
| `VITE_PRIVACY_POLICY_URL` | `""` *(empty)* | Optional standalone Privacy Policy URL. When empty, clicking Privacy Policy opens the built-in accessible disclosure modal. |
| `VITE_TERMS_OF_USE_URL` | `""` *(empty)* | Optional standalone Terms of Use URL. When empty, clicking Terms of Use opens the built-in accessible disclosure modal. |

### How Environment Precedence Works
1. **Cloudflare Pages Dashboard (`Settings -> Environment variables`):** Highest priority. Any `VITE_*` variable defined in Cloudflare Pages overrides `.env.production` automatically during `npm run build` (trigger a redeploy after changing variables in Cloudflare).
2. **`.env.production` (Committed to Git):** Contains safe, non-secret production defaults so your first GitHub push to Cloudflare Pages builds cleanly even before adding dashboard overrides.
3. **`.env` (Gitignored):** Used for local development overrides on your machine.
4. **Security Rule:** Never store private API keys or secrets in `VITE_*` variables, as Vite embeds `VITE_*` values into the public browser bundle.

---

## 4. Deploying to Cloudflare Pages via GitHub

1. **Push this repository to GitHub.**
   - `.gitignore` excludes `node_modules/`, `dist/`, local `.env`, and internal workspace attachments while keeping `.env.example`, `.env.production`, `.nvmrc`, `.node-version`, and `public/_headers`.

2. **Connect GitHub to Cloudflare Pages:**
   - In the Cloudflare Dashboard, open **Compute (Workers & Pages) -> Create -> Pages -> Connect to Git** and select your GitHub repository.

3. **Set Build Configuration:**
   - **Production branch:** `main` (or your default branch)
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/`

4. **Confirm Node.js Runtime & Environment Variables:**
   - Cloudflare Pages reads `.node-version` and `.nvmrc` (`22`) automatically. If your Cloudflare account uses an older build image preset, ensure **Compatibility / Environment variable** `NODE_VERSION` is set to `22` (or `npm install && npm run build` if overriding lockfile behavior).
   - Under **Settings -> Environment variables (Production & Preview)**, you can optionally set `VITE_CALL_PHONE_E164`, `VITE_SITE_URL`, `VITE_PRIVACY_POLICY_URL`, or `VITE_TERMS_OF_USE_URL` whenever you want to update numbers or legal links without editing code.

5. **Verify Custom Domain (`insuranceforautoz.com`):**
   - Under **Custom domains** in your Cloudflare Pages project, verify `insuranceforautoz.com` (and optionally `www.insuranceforautoz.com` redirecting to the apex domain `https://insuranceforautoz.com`).
   - Under **SSL/TLS**, set encryption mode to **Full (strict)** and enable **Always Use HTTPS**.
   - Cloudflare Pages automatically applies `dist/_headers` (copied from `public/_headers`) for security headers and long-lived immutable caching on hashed JS/CSS assets.

---

## 5. Post-Publish Client Checklist

- **Standalone Legal URLs:** Once dedicated Privacy Policy and Terms of Use pages or hosted URLs are finalized, set `VITE_PRIVACY_POLICY_URL` and `VITE_TERMS_OF_USE_URL` in Cloudflare Pages and trigger a redeploy.
- **Business Email:** Intentionally omitted until an official mailbox is active.
- **Call-Center Operating Hours:** Omitted to avoid displaying unverified hours; add verified hours in `src/config/site.ts` once confirmed.
