import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import webExtension, { readJsonFile } from "vite-plugin-web-extension";

function generateManifest() {
  const manifest = readJsonFile("src/manifest.json");
  const pkg = readJsonFile("package.json");

  // Until https://bugzil.la/1766026 has been fixed, we need to keep using
  // manifest_version 2 for Firefox.
  const manifestVersion = process.env.TARGET === "firefox" ? 2 : 3;

  return {
    ...manifest,
    name: "Copy Guard",
    description: pkg.description,
    version: pkg.version,
    manifest_version: manifestVersion,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  define: {
    __VERSION__: JSON.stringify(readJsonFile("package.json").version),
  },
  plugins: [
    svelte(),
    webExtension({
      browser: process.env.TARGET || "chrome",
      manifest: generateManifest,
      watchFilePaths: ["package.json", "manifest.json"],
      webExtConfig: {
        startUrl: process.env.START_URL || "https://example.com",
      },
    }),
  ],
});
