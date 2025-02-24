import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
// import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Geist dDevKit",
			social: {
				github: "https://github.com/fractaldotbox/geist-ddev-kit",
			},
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
					label: "Components",
					autogenerate: { directory: "components" },
				},
				{
					label: "Contributing",
					autogenerate: { directory: "contributing" },
				},
			],
		}),
	],
	// adapter: cloudflare({
	// 	imageService: "cloudflare",
	// }),
	image: {
		service: passthroughImageService(),
	},
});
