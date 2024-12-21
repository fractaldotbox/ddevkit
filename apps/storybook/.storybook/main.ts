import { dirname, join } from "path";
import type { StorybookConfig } from "@storybook/react-vite";
import { loadEnv } from "vite";

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
	return dirname(require.resolve(join(value, "package.json")));
}

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	core: {
		builder: {
			name: "@storybook/builder-vite",
			options: {
				viteConfigPath: "../../vite.config.ts",
			},
		},
	},
	addons: [
		getAbsolutePath("@storybook/addon-onboarding"),
		getAbsolutePath("@storybook/addon-links"),
		getAbsolutePath("@storybook/addon-essentials"),
		getAbsolutePath("@chromatic-com/storybook"),
		getAbsolutePath("@storybook/addon-interactions"),
	],
	framework: {
		name: getAbsolutePath("@storybook/react-vite"),
		options: {},
	},
	env: (config) => {
		const env = loadEnv(config?.NODE_ENV || "development", process.cwd(), "");
		return {
			...config,
			...env,
		};
	},
};
export default config;
