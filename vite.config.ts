import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';

function normalizeSiteOrigin(raw: string | undefined): string {
  const cleaned = (raw || '').trim().replace(/\/+$/, '');
  if (!cleaned || cleaned.startsWith('MY_')) {
    return 'https://insuranceforautoz.com';
  }
  if (/^https?:\/\//i.test(cleaned)) {
    return cleaned.replace(/^http:\/\//i, 'https://');
  }
  return `https://${cleaned}`;
}

function formatPhoneMetadata(rawE164: string): {
  fullDisplay: string;
  schemaTel: string;
} {
  const digits = rawE164.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    const area = digits.slice(1, 4);
    const prefix = digits.slice(4, 7);
    const line = digits.slice(7, 11);
    return {
      fullDisplay: `+1 (${area}) ${prefix}-${line}`,
      schemaTel: `+1-${area}-${prefix}-${line}`,
    };
  }
  if (digits.length === 10) {
    const area = digits.slice(0, 3);
    const prefix = digits.slice(3, 6);
    const line = digits.slice(6, 10);
    return {
      fullDisplay: `+1 (${area}) ${prefix}-${line}`,
      schemaTel: `+1-${area}-${prefix}-${line}`,
    };
  }
  return {fullDisplay: rawE164, schemaTel: rawE164};
}

function productionSitePlugin(env: Record<string, string>): Plugin {
  const siteOrigin = normalizeSiteOrigin(env.VITE_SITE_URL);
  const phoneE164 = (env.VITE_CALL_PHONE_E164 || '+18484671057').trim();
  const streetAddress = (
    env.VITE_COMPANY_ADDRESS_LINE1 || '7901 4th St N STE 300'
  ).trim();
  const {fullDisplay, schemaTel} = formatPhoneMetadata(phoneE164);

  return {
    name: 'insuranceforautoz-production-metadata',
    transformIndexHtml(html) {
      return html
        .replaceAll('https://insuranceforautoz.com', siteOrigin)
        .replaceAll('+1 (848) 467-1057', fullDisplay)
        .replaceAll('+1-848-467-1057', schemaTel)
        .replaceAll('7901 4th St N STE 300', streetAddress);
    },
    closeBundle() {
      const distDir = path.resolve(import.meta.dirname, 'dist');
      if (!fs.existsSync(distDir)) {
        return;
      }

      // Exclude internal AI Studio prompt/reference attachments from production dist
      const internalAttachmentsDir = path.join(distDir, 'assets', 'aistudio');
      if (fs.existsSync(internalAttachmentsDir)) {
        fs.rmSync(internalAttachmentsDir, {recursive: true, force: true});
      }

      // Sync robots.txt and sitemap.xml with active https:// site origin
      for (const filename of ['robots.txt', 'sitemap.xml']) {
        const filePath = path.join(distDir, filename);
        if (fs.existsSync(filePath)) {
          const updated = fs
            .readFileSync(filePath, 'utf-8')
            .replaceAll('https://insuranceforautoz.com', siteOrigin);
          fs.writeFileSync(filePath, updated, 'utf-8');
        }
      }
    },
  };
}

export default defineConfig(({command, mode}) => {
  const env = loadEnv(mode, import.meta.dirname, '');

  return {
    base: '/',
    plugins: [react(), tailwindcss(), productionSitePlugin(env)],
    define:
      command === 'build'
        ? {
            'process.env.NODE_ENV': JSON.stringify('production'),
          }
        : undefined,
    build: {
      target: 'es2020',
      assetsDir: 'assets',
      sourcemap: false,
      cssCodeSplit: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
