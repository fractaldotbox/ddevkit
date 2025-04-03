import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import { fetchStories, storybookLoader } from "./src/storybook-loader.ts";
// No access to `getCollection` here, use loader

// sidebar use docs collection as default, model as external link
export const getSidebarComponentsSlugs = async () => {
	const entries = await fetchStories();

	return entries.map(({ id, name }) => {
		return {
			label: name,
			link: `/component/${id}`,
		};
	});
};

const components = await getSidebarComponentsSlugs();

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "dDevKit",
			social: {
				github: "https://github.com/fractaldotbox/geist-ddev-kit",
			},
			customCss: [
				// Path to your Tailwind base styles:
				"./src/styles/global.css",
			],
			sidebar: [
				{
					label: "Intro",
					autogenerate: { directory: "intro" },
				},
				{
					label: "Guides",
					autogenerate: { directory: "guides" },
				},

				// TODO align storybook groups
				{
					label: "Components",
					items: components,
				},

				{
					label: "Design",
					autogenerate: { directory: "design" },
				},
				{
					label: "Contributing",
					autogenerate: { directory: "contributing" },
				},
			],
			favicon: "/favicon.svg",
		}),
		tailwind({
			// Disable the default base styles:
			applyBaseStyles: true,
		}),
	],
	// adapter: cloudflare({
	// 	imageService: "cloudflare",
	// }),
	image: {
		service: passthroughImageService(),
	},
});
