import { defineCollection, z } from 'astro:content';

const news = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional().default('/page-content/news/newsroom.png'),
		showHeroInContent: z.boolean().optional().default(false)
	}),
});

export const collections = { news };
