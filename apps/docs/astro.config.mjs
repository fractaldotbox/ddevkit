import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
// import cloudflare from "@astrojs/cloudflare";

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
