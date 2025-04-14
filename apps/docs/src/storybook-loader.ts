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

export const fetchStoriesWithDoc = async () => {
	const stories = (await fetchStories()) as StoryMeta[];

	return stories.filter(filterStoryEntry).map((story: StoryMeta) => {
		const { id, type, title } = story;

		const component = stories.find((story: StoryMeta) => {
			return story.title === title && story.type === "story";
		});

		return {
			id,
			slug: id,
			...story,
			name: component.name,
			title: component.title,
			componentPath: component?.componentPath || "",
		};
	});
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
	const stories = (await fetchStoriesWithDoc()) as StoryMeta[];

	// Transform Storybook stories into Astro content entries
	return stories.forEach((story: StoryMeta) => {
		const { id, type, title } = story;

		context.store.set({
			id,
			data: story,
		});
	});
};

export const storybookLoader = (): Loader => {
	return {
		name: "storybook",
		load,
	};
};
