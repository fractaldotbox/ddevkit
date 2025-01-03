import { Registry } from "#registry/schema";

export const hooks: Registry = [
	{
		name: "use-get-attestation-with-uid",
		type: "registry:hook",
		files: [
			{
				path: "hooks/use-get-attestation-with-uid.ts",
				type: "registry:hook",
			},
		],
	},
];
