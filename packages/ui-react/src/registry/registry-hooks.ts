import { Registry } from "#registry/schema";

export const hooks: Registry = [
	{
		name: "use-get-attestation-with-uid",
		type: "registry:hook",
		files: [
			{
				path: "hooks/eas/use-get-attestation-with-uid.tsx",
				type: "registry:hook",
			},
		],
	},
];
