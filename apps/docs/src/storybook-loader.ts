export const STORYBOOK_URL = "https://ddev-storybook.geist.network";

import { type Loader, glob } from "astro/loaders";

export const filterStoryEntry = ({
	id,
	type,
}: { id: string; type: string }) => {
	return type === "docs" && id !== "ddevkit--docs";
};

export const fetchStories = async () => {
	const response = await fetch(`${STORYBOOK_URL}/index.json`);

	if (!response.ok) {
		throw new Error(`Failed to fetch Storybook data: ${response.statusText}`);
	}
	const stories = await response.json();

	return Object.values(stories.entries);
};

export type StoryMeta = {
	id: string;
	type: string;
	name: string;
	title: string;
	componentPath: string;
	tags: string[];
};

// Custom loader for Storybook components
export const load = async (context): Promise<any> => {
	const stories = (await fetchStories()) as StoryMeta[];

	// Transform Storybook stories into Astro content entries
	return stories.filter(filterStoryEntry).forEach((story: StoryMeta) => {
		const { id, type, title } = story;

		const component = stories.find((story: StoryMeta) => {
			return story.title === title && story.type === "story";
		});
		// Extract component name and story title
		const [componentName, storyTitle] = id.split("--");

		// componentPath
		// Transform story data into frontmatter for Starlight
		const entry = {
			id,
			slug: id,
			...story,
			componentPath: component?.componentPath || "",
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
