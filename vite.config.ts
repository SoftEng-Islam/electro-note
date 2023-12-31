import { rmSync } from "node:fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import { notBundle } from 'vite-plugin-electron/plugin'
import pkg from "./package.json";
import { URL } from "node:url";
import vuePugPlugin from "vue-pug-plugin";


export default defineConfig(({ command }) => {
	rmSync("dist-electron", { recursive: true, force: true });
	const isServe = command === "serve";
	const isBuild = command === "build";
	const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
	return {
		plugins: [
			vue({
				template: {
					preprocessOptions: {
						plugins: [vuePugPlugin],
					},
				},
			}),
			electron([
				{
					// Main-Process entry file of the Electron App.
					entry: "electron/main/index.ts",
					onstart(options) {
						if (process.env.VSCODE_DEBUG) {
							console.log(
								/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
							);
						} else {
							options.startup();
						}
					},
					vite: {
						build: {
							sourcemap,
							minify: isBuild,
							outDir: "dist-electron/main",
							rollupOptions: {
								external: Object.keys(
									"dependencies" in pkg ? pkg.dependencies : {}
								),
							},
						},
					},
				},

				{
					entry: [
						"electron/main/models/dbmgr.ts",
						"electron/main/models/testmgr.ts",
						"electron/main/models/menu.ts",
					],
					vite: {
						build: {
							sourcemap,
							minify: isBuild,
							outDir: "dist-electron/main/models",
							rollupOptions: {
								external: Object.keys("dependencies" in pkg ? pkg.dependencies : {}),
							},
						},
					},
				},
				{
					entry: "electron/preload/index.ts",
					onstart({ reload }) {
						// Notify the Renderer process to reload the page when the Preload scripts build is complete,
						// instead of restarting the entire Electron App.
						reload();
					},
					vite: {
						build: {
							sourcemap: sourcemap ? "inline" : undefined, // #332
							minify: isBuild,
							outDir: "dist-electron/preload",
							rollupOptions: {
								external: Object.keys(
									"dependencies" in pkg ? pkg.dependencies : {}
								),
							},
						},
						plugins: [isServe && notBundle()],
					},
				},
			]),
			renderer(),
		],
		server:
			process.env.VSCODE_DEBUG &&
			(() => {
				const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
				return {
					host: url.hostname,
					port: +url.port,
				};
			})(),
		clearScreen: false,
		resolve: {
			alias: {
				vue: "vue/dist/vue.esm-bundler",
			},
		},
	};
});
