import { defineCollection, z } from "astro:content";
import { string } from "astro:schema";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { storybookLoader } from "./storybook-loader";

// component probably reserved
export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	components: defineCollection({
		loader: storybookLoader(),
		schema: docsSchema({
			extend: z.object({
				name: z.string(),
				description: z.string(),
				componentPath: z.string(),
			}),
		}),
	}),
};
