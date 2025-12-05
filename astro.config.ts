import mdx from "@astrojs/mdx";
import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { rehypePlugins, remarkPlugins } from "./src/build-time";

const site =
  process.env.ASTRO_SITE ?? "https://skrishnan22.github.io/personal-blog/";
const base = process.env.ASTRO_BASE ?? "/personal-blog/";

// https://astro.build/config
export default defineConfig({
  site,
  base,
  markdown: {
    // We'll highlight using Shiki Twoslash remark plugin
    syntaxHighlight: false,
    gfm: true,
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    mdx({
      extendMarkdownConfig: true,
      // MDX integration inherits all remark plugins from markdown.remarkPlugins
      remarkPlugins: remarkPlugins(__dirname),
      rehypePlugins: rehypePlugins,
    }),
    solidJs(),
  ],
  vite: {
    ssr: {
      noExternal: [
        "@fontsource-variable/inter",
        "@fontsource-variable/brygada-1918",
      ],
    },
    define: {
      "import.meta.env.PUBLIC_URL": JSON.stringify(
        process.env.PUBLIC_URL ?? site,
      ),
    },
  },
});
