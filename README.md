# wolvhaven.net

The official website for the WolvHaven minecraft server - created using Astro with TailwindCSS

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 📝 Adding Content

### Pages

Pages can be found in the `src/pages` directory. To create a new page, add a new `.md` file or a `.astro` file.
- File names should be in `lower-kebab-case` (e.g. `src/pages/social-media.md`)
- Once created, the default url should be the same as your page file name without the extension

Pages must use the `BaseLayout` for the full website layout to be rendered. For example:

#### .astro files
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Some title" subtitle="Some subtitle">
    <!--Your Content Goes Here-->
</BaseLayout>
```

You may also supply html into the `pageHeader` slot to override the default rendering of the title and subtitle as such:
```astro
<BaseLayout>
    <div slot="pageHeader"><p>Some Header HTML</p></div>

    <!--Rest of your content goes here-->
</BaseLayout>
```

#### .md files
Pages created using md files must mention the `layout` in the frontmatter. You may supply the title, subtitle, and headerImg in the frontmatter also.

For example:
```
---
layout: ../layouts/BaseLayout.astro
title: "Appeals"
subtitle: "All information pertaining to penalties, warnings & appeal processes can be found here"
headerImg: "/page-content/appeals/appeal.png"
---

## Content goes here
```

### News Posts

News posts should be either in `.md` or `.mdx` files. They must be formatted in `lower-kebab-case` and follow the following format:
```
YYYY-MM-DD-url-slut-here.md
```

- Use `.md` files by default
- Use `.mdx` files to allow embeds like youtube videos

News posts must have frontmatter:
```
---
title: "As it Happened: WolvHaven Celebrates Pride 2020"            # Title
description: "A recap of the Pride 2020 celebrations on WolvHaven"  # Subtitle
pubDate: "2020-06-27"                                               # Date in YYYY-MM-DD
heroImage: "/post-content/2020-pride.png"                           # Image link
showHeroInContent: true                                             # Default is false
---
```

### Commit Message

When committing directly to the main branch, ensure your commit message follows the following format:

- `ContentUpdate: short description of content update` for changes to the website content (e.g. pages and news posts)
- `Feat: short description of feature` for changes related to the website's features (e.g. layout changes, new components etc.)
- `Docs: short description of docu change` for changes to documentation (e.g. this readme file)
- `Fix: short description of fix` for fixes (e.g. typos, bugs)

Where possible if working in separate branches, squash commits when merging into main and follow above format.

When a commit to main is pushed, the github actions pipeline will run and build the website, then deploy it onto github pages.

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

## Custom tailwind colors
- `main-50` is the main WolvHaven server color `#7f0000`
- `main-100` is the darker variant used for hovering and active etc. `#690000`
