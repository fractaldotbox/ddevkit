import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import {
	fetchStoriesWithDoc,
	filterStoryEntry,
} from "./src/storybook-loader.ts";

const PUBLIC_DOC_SITE_URL = "https://ddev-storybook.geist.network";

export const getSidebarComponentsSlugs = async () => {
	const entries = await fetchStoriesWithDoc();
	// Group entries by their title parts
	const groupedEntries = entries
		.filter(filterStoryEntry)
		.reduce((acc, { id, title, name }) => {
			const parts = title.split("/");
			const [group, subgroup] = parts;

			if (!acc[group]) {
				acc[group] = {};
			}
			if (!acc[group][subgroup]) {
				acc[group][subgroup] = [];
			}

			acc[group][subgroup].push({
				label: name,
				// model as external link as slug only applicable to doc
				link: `/component/${id}`,
			});

			return acc;
		}, {});

	// Convert groups into nested sidebar items
	return Object.entries(groupedEntries).map(([group, subgroups]) => ({
		label: group,
		items: Object.entries(subgroups).map(([subgroup, items]) => ({
			label: subgroup,
			items,
		})),
	}));
};

const components = await getSidebarComponentsSlugs();

// https://astro.build/config
export default defineConfig({
	site: PUBLIC_DOC_SITE_URL,
	integrations: [
		starlight({
			title: "dDevKit",
			social: {
				github: "https://github.com/fractaldotbox/ddevkit",
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
					label: "Components",
					items: components,
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
	image: {
		service: passthroughImageService(),
	},
});
