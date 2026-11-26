import mdx from "@astrojs/mdx";
import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

// import { createConfig as createMdxConfig } from "./src/config/mdx.config";

const env = loadEnv(import.meta.env.MODE, process.cwd(), "");

export default defineConfig({
	/**
	 * When switching to static site generation, place an empty `index.astro` file in
	 * the `src/pages` folder, so `astro` will generate a redirect to the default locale
	 * via `<meta http-equiv="refresh" content="0;url=/en/">`.
	 */
	adapter: node({
		mode: "standalone",
	}),
	base: env.PUBLIC_APP_BASE_PATH,
	integrations: [
		icon({
			/** @see https://www.astroicon.dev/reference/configuration/#include */
			include: {
				lucide: [
					"chevron-down",
					"chevron-left",
					"chevron-right",
					"circle-play",
					"circle-pause",
					"menu",
					"message-circle",
					"search",
					"square-arrow-left",
					"x",
				],
			},
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								removeViewBox: false,
							},
						},
					},
				],
			},
		}),
		keystatic(),
		mdx(),
		/**
		 * @see https://docs.astro.build/en/guides/integrations-guide/solid-js/#combining-multiple-jsx-frameworks
		 * @see https://github.com/Thinkmill/keystatic/discussions/951
		 */
		react({
			include: [
				"keystatic.config.@(ts|tsx)",
				"**/content/**/*.@(ts|tsx)",
				"**/keystatic/**/*.@(ts|tsx)",
			],
		}),
		sitemap(),
	],
	/** Use `@/lib/content/get-mdx-content.ts` instead of astro's built-in markdown processor. */
	// // @ts-expect-error Astro types are incomplete.
	// markdown: {
	// 	...(await createMdxConfig(defaultLocale)),
	// 	gfm: false,
	// 	smartypants: false,
	// 	syntaxHighlight: false,
	// },
	output: "static",
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	scopedStyleStrategy: "where",
	security: {
		allowedDomains: [
			{ hostname: new URL(env.PUBLIC_APP_BASE_URL ?? "http://localhost:3000").hostname },
		],
	},
	server: {
		host: "127.0.0.1",
		port: 3000,
	},
	site: env.PUBLIC_APP_BASE_URL,
	vite: {
		plugins: [tailwindcss()],
		ssr: { noExternal: ["lucide-react"] },
	},
});
