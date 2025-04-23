import { defineCollection, z } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { glob } from "astro/loaders";
import { storybookLoader } from "./storybook-loader";

// component probably reserved
export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	testimonials: defineCollection({
		loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
		schema: z.object({
			name: z.string(),
			x: z.string(),
			xAvatar: z.string().optional(),
			xPost: z.string(),
		}),
	}),
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
