import { Registry } from "#registry/schema";

export const lib: Registry = [
	{
		name: "utils",
		type: "registry:lib",
		dependencies: [],
		files: [
			{
				path: "lib/utils/hex.ts",
				type: "registry:lib",
			},
		],
	},
];
