import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function cleanInternalArtifactsPlugin(): Plugin {
  let isSsr = false;

  return {
    name: 'insuranceforautoz-clean-artifacts',
    configResolved(config) {
      isSsr = Boolean(config.build.ssr);
    },
    closeBundle() {
      if (isSsr) {
        return;
      }
      const distDir = path.resolve(import.meta.dirname, 'dist');
      const internalAttachmentsDir = path.join(distDir, 'assets', 'aistudio');
      if (fs.existsSync(internalAttachmentsDir)) {
        fs.rmSync(internalAttachmentsDir, {recursive: true, force: true});
      }
    },
  };
}

export default defineConfig(({command}) => {
  const isBuild = command === 'build';
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      cleanInternalArtifactsPlugin(),
    ],
    define: isBuild
      ? {
          'process.env.NODE_ENV': JSON.stringify('production'),
        }
      : undefined,
    build: {
      target: 'es2020',
      assetsDir: 'assets',
      sourcemap: false,
      cssCodeSplit: false,
      modulePreload: {
        polyfill: false,
      },
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
