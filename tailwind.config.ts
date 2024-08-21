import { createPreset } from "@acdh-oeaw/tailwindcss-preset";
import type { Config } from "tailwindcss";

const preset = createPreset();

const config: Config = {
	content: [
		"./keystatic.config.tsx",
		"./content/**/*.@(md|mdx)",
		"./src/@(components|layouts|pages)/**/*.@(astro|css|ts|tsx)",
		"./src/styles/**/*.css",
	],
	presets: [preset],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: "hsl(217.6deg 60.6% 39.8% / <alpha-value>)",
					intent: "hsl(217.6deg 60.6% 24.8% / <alpha-value>)",
				},
			},
			screens: {
				xs: "30rem",
				lg: "70rem",
			},

			typography: {
				DEFAULT: {
					css: {
						maxWidth: "none",
						/** Don't add quotes around `blockquote`. */
						"blockquote p:first-of-type::before": null,
						"blockquote p:last-of-type::after": null,
						/** Don't add backticks around inline `code`. */
						"code::before": null,
						"code::after": null,
					},
				},
			},
		},
	},
};

export default config;
