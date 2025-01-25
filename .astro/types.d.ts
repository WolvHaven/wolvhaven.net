declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"news": {
"2020-01-13-discord-qr-code.md": {
	id: "2020-01-13-discord-qr-code.md";
  slug: "2020-01-13-discord-qr-code";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-01-23-wher-year.md": {
	id: "2020-01-23-wher-year.md";
  slug: "2020-01-23-wher-year";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-03-11-citizen-app.md": {
	id: "2020-03-11-citizen-app.md";
  slug: "2020-03-11-citizen-app";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-03-26-elytra-race.md": {
	id: "2020-03-26-elytra-race.md";
  slug: "2020-03-26-elytra-race";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-05-03-113-upgrade.md": {
	id: "2020-05-03-113-upgrade.md";
  slug: "2020-05-03-113-upgrade";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-05-07-reddit.md": {
	id: "2020-05-07-reddit.md";
  slug: "2020-05-07-reddit";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-05-10-may-2020-ge.md": {
	id: "2020-05-10-may-2020-ge.md";
  slug: "2020-05-10-may-2020-ge";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-05-31-may-2020-ge-results.md": {
	id: "2020-05-31-may-2020-ge-results.md";
  slug: "2020-05-31-may-2020-ge-results";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-06-22-pride-2020.md": {
	id: "2020-06-22-pride-2020.md";
  slug: "2020-06-22-pride-2020";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-06-27-pride-2020-recap.md": {
	id: "2020-06-27-pride-2020-recap.md";
  slug: "2020-06-27-pride-2020-recap";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-08-05-server-leadership.md": {
	id: "2020-08-05-server-leadership.md";
  slug: "2020-08-05-server-leadership";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-10-14-political-system-changes.md": {
	id: "2020-10-14-political-system-changes.md";
  slug: "2020-10-14-political-system-changes";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-10-29-staff-changes-whistleblowing.md": {
	id: "2020-10-29-staff-changes-whistleblowing.md";
  slug: "2020-10-29-staff-changes-whistleblowing";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2020-11-08-representation-referendum.md": {
	id: "2020-11-08-representation-referendum.md";
  slug: "2020-11-08-representation-referendum";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2021-04-05-new-wiki.md": {
	id: "2021-04-05-new-wiki.md";
  slug: "2021-04-05-new-wiki";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2021-06-03-new-wiki-register.md": {
	id: "2021-06-03-new-wiki-register.md";
  slug: "2021-06-03-new-wiki-register";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2021-06-14-changes-server-experience.md": {
	id: "2021-06-14-changes-server-experience.md";
  slug: "2021-06-14-changes-server-experience";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2021-06-15-pride-2021.md": {
	id: "2021-06-15-pride-2021.md";
  slug: "2021-06-15-pride-2021";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2021-06-21-new-rules.md": {
	id: "2021-06-21-new-rules.md";
  slug: "2021-06-21-new-rules";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2021-06-26-pride-2021-recap.md": {
	id: "2021-06-26-pride-2021-recap.md";
  slug: "2021-06-26-pride-2021-recap";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2021-10-27-vision-2023.md": {
	id: "2021-10-27-vision-2023.md";
  slug: "2021-10-27-vision-2023";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2022-04-06-vision-2023-rank-structure.md": {
	id: "2022-04-06-vision-2023-rank-structure.md";
  slug: "2022-04-06-vision-2023-rank-structure";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2023-04-20-introducing-town-hall.md": {
	id: "2023-04-20-introducing-town-hall.md";
  slug: "2023-04-20-introducing-town-hall";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2023-12-20-2023-new-website.md": {
	id: "2023-12-20-2023-new-website.md";
  slug: "2023-12-20-2023-new-website";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2024-01-28-townhall-2024-01.md": {
	id: "2024-01-28-townhall-2024-01.md";
  slug: "2024-01-28-townhall-2024-01";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2024-02-15-calidia-cleanup-2024.md": {
	id: "2024-02-15-calidia-cleanup-2024.md";
  slug: "2024-02-15-calidia-cleanup-2024";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2024-09-28-mywarp-introduction.md": {
	id: "2024-09-28-mywarp-introduction.md";
  slug: "2024-09-28-mywarp-introduction";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
"2024-10-07-townhall-2024-09.md": {
	id: "2024-10-07-townhall-2024-09.md";
  slug: "2024-10-07-townhall-2024-09";
  body: string;
  collection: "news";
  data: InferEntrySchema<"news">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
