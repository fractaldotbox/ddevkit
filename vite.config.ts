import path from "path";
import react from "@vitejs/plugin-react";
/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
// @ts-ignore required for config
import { test } from "vitest";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
	resolve: {},
	// TODO react module only config
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: path.resolve(__dirname, "./test-setup.ts"),
		env: loadEnv(mode, process.cwd(), ""),
	},
	plugins: [react()],
	define: {
		"process.env": process.env,
	},
}));
