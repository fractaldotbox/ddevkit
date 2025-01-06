import path from "path";
import react from "@vitejs/plugin-react";
/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";

import { test } from "vitest";
import { configDefaults } from "vitest/config";

const problematicEnvVars = [
	'CommonProgramFiles(x86)',
	'ProgramFiles(x86)',
	'IntelliJ IDEA Community Edition'
];

console.log("problematicEnvVars")
console.log(problematicEnvVars)

problematicEnvVars.forEach((varName) => {
	delete process.env[varName];
});

const getTestPatterns = (suites: string) => {
	if (suites === "unit") {
		return {
			exclude: ["**/*.int.test.ts(x)?", "**/*.e2e.test.ts(x)?"],
		};
	}
	if (suites === "int") {
		return {
			exclude: ["**/*.e2e.test.ts(x)?"],
		};
	}
	return {
		exclude: [],
	};
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	// Clear specific environment variables
	problematicEnvVars.forEach((varName) => {
		delete process.env[varName];
	});
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
				...getTestPatterns(env.VITEST_SUITES).exclude,
			],
		},
		plugins: [
			react()
		],
		define: {
			"process.env": process.env,
		},
	};
});
