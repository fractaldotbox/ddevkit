import starlightPlugin from "@astrojs/starlight-tailwind";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	plugins: [starlightPlugin()],
	safelist: [
		{
			pattern: /(min|max)*-*w-/,
		},
		{
			pattern: /(min|max)*-*h-/,
		},

		{
			pattern: /bg-/,
		},
	],
	darkMode: ["class", '[data-mode="dark"]'],
};
