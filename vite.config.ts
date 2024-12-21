import path from "path";
import react from "@vitejs/plugin-react";
/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";

import { test } from "vitest";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	console.log(env.VITE_SUITES);
	return {
		resolve: {},
		// TODO react module only config
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: path.resolve(__dirname, "./test-setup.ts"),
			env: loadEnv(mode, process.cwd(), ""),
			// TODO by env flags, for now just skip int tests
			exclude: [
				...configDefaults.exclude,
				...(env.VITEST_SUITES === "unit"
					? ["**/*.int.test.ts(x)?", "**/*.e2e.test.ts(x)?"]
					: []),
			],
		},
		plugins: [react()],
		define: {
			"process.env": process.env,
		},
	};
});
