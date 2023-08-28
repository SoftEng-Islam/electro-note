import { URL } from 'node:url';
import { rmSync } from "node:fs";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
import renderer from "vite-plugin-electron-renderer";
import pkg from './package.json';

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
									"dependencies" in pkg
										? pkg.dependencies
										: {}
								),
							},
						},
					},
				},
				{
					entry: "electron/main/preloader.ts",
					onstart(options) {
						options.reload();
					},
					vite: {
						build: {
							sourcemap: sourcemap ? "inline" : undefined,
							minify: isBuild,
							outDir: "dist-electron/main",
							rollupOptions: {
								external: Object.keys(
									"dependencies" in pkg
										? pkg.dependencies
										: {}
								),
							},
						},
					},
				},
				{
					entry: "electron/main/menu.ts",
					vite: {
						build: {
							sourcemap: sourcemap ? "inline" : undefined,
							minify: isBuild,
							outDir: "dist-electron/main",
							rollupOptions: {
								external: Object.keys(
									"dependencies" in pkg
										? pkg.dependencies
										: {}
								),
							},
						},
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
				'vue': 'vue/dist/vue.esm-bundler',
			},
		}
	};

});