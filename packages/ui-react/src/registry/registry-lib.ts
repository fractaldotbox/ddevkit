import { Registry } from "#registry/schema";

export const lib: Registry = [
	{
		name: "hex",
		type: "registry:lib",
		dependencies: [],
		files: [
			{
				path: "lib/utils/hex.ts",
				type: "registry:lib",
			},
		],
	},
	{
		name: "address",
		type: "registry:lib",
		dependencies: [],
		files: [
			{
				path: "lib/utils/address.ts",
				type: "registry:lib",
			},
		],
	},
];
