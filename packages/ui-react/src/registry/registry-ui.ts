import type { Registry } from "#registry/schema";

export const ui: Registry = [
	{
		name: "address-badge",
		type: "registry:ui",
		dependencies: ["viem", "wagmi", "lucide-react"],
		shadcnDependencies: ["badge", "tooltip"],
		files: [
			{
				type: "registry:ui",
				path: "components/identity/address-badge.tsx",
			},
			{
				type: "registry:lib",
				path: "lib/utils/address.ts",
			},
		],
	},
	{
		name: "avatar",
		type: "registry:ui",
		dependencies: ["viem", "wagmi"],
		shadcnDependencies: [],
		files: [
			{
				type: "registry:ui",
				path: "components/identity/avatar.tsx",
			},
		],
	},

	{
		name: "avatar-wagmi",
		type: "registry:ui",
		dependencies: ["viem", "wagmi"],
		shadcnDependencies: [],
		files: [
			{
				type: "registry:ui",
				path: "components/identity/avatar-wagmi.tsx",
			},
		],
	},

	{
		name: "name",
		type: "registry:ui",
		dependencies: ["viem"],
		shadcnDependencies: [],
		files: [
			{
				type: "registry:ui",
				path: "components/identity/name.tsx",
			},
			{
				type: "registry:hook",
				path: "hooks/ens/use-efp-api.ts",
			},
		],
	},
	{
		name: "name-wagmi",
		type: "registry:ui",
		dependencies: ["viem", "wagmi"],
		shadcnDependencies: [],
		files: [
			{
				type: "registry:ui",
				path: "components/identity/name-wagmi.tsx",
			},
		],
	},
	// {
	// 	name: "attestation-badge",
	// 	type: "registry:ui",
	// 	dependencies: ["viem", "wagmi"],
	// 	shadcnDependencies: ["badge"],
	// 	files: [
	// 		{
	// 			type: "registry:hook",
	// 			path: "hooks/eas/use-get-attestations.tsx",
	// 		},
	// 	],
	// },

	{
		name: "attestation-card",
		type: "registry:ui",
		dependencies: ["viem", "wagmi", "@radix-ui/react-label", "date-fns"],
		shadcnDependencies: ["card", "separator", "skeleton", "tooltip"],
		files: [
			{
				type: "registry:ui",
				path: "components/attestations/attestation-card.tsx",
			},

			{
				type: "registry:hook",
				path: "hooks/eas/use-get-attestation-with-uid.tsx",
			},
		],
	},

	{
		name: "attestations-table",
		type: "registry:ui",
		dependencies: ["viem", "wagmi", "@tanstack/react-table"],
		shadcnDependencies: ["tooltip"],
		files: [
			{
				type: "registry:ui",
				path: "components/attestations/attestations-table.tsx",
			},
			{
				type: "registry:ui",
				path: "components/attestations/attestation-schema-badge.tsx",
			},
			{
				type: "registry:ui",
				path: "components/data-table.tsx",
			},
			{
				type: "registry:hook",
				path: "hooks/eas/use-get-attestations.ts",
			},
			{
				type: "registry:lib",
				path: "lib/eas/easscan.ts",
			},
			{
				type: "registry:lib",
				path: "lib/utils/hex.ts",
			},
		],
	},
];
