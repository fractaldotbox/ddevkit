/// <reference types="vitest/config" />
import viteConfig from "../../vite.config";

import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
	const env = loadEnv(mode, process.cwd(), "");

	const config = viteConfig(mode);

	return {
		resolve: {},
		test: {
			env: loadEnv(mode, process.cwd(), ""),
			exclude: config.test!.exclude,
		},
		plugins: [],
		define: {
			"process.env": process.env,
		},
	};
});
