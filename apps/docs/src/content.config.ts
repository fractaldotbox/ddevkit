import { defineCollection, z } from "astro:content";
import type { SchemaContext } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { type Loader, glob } from "astro/loaders";
import { storybookLoader } from "./storybook-loader";

// component probably reserved
export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	components: defineCollection({
		loader: storybookLoader(),
		schema: docsSchema({
			extend: z.object({
				description: z.string(),
			}),
		}),
	}),
};
