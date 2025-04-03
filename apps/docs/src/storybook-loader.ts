export const STORYBOOK_URL = "https://ddev-storybook.geist.network";

import { type Loader, glob } from "astro/loaders";

export const fetchStories = async () => {
	const response = await fetch(`${STORYBOOK_URL}/index.json`);

	if (!response.ok) {
		throw new Error(`Failed to fetch Storybook data: ${response.statusText}`);
	}
	const stories = await response.json();

	return Object.values(stories.entries).filter(
		({ importPath }: { importPath: string }) => {
			return importPath !== "./src/stories/Configure.mdx";
		},
	);
};
// Custom loader for Storybook components
export const load = async (context): Promise<any> => {
	const stories = await fetchStories();

	// Transform Storybook stories into Astro content entries
	return stories.forEach((story) => {
		const { id } = story;
		// Extract component name and story title
		const [componentName, storyTitle] = id.split("--");

		// Transform story data into frontmatter for Starlight
		const entry = {
			id,
			slug: id,
			...story,
		};

		context.store.set({
			id,
			data: entry,
		});
	});
};

export const storybookLoader = (): Loader => {
	return {
		name: "storybook",
		load,
	};
};
