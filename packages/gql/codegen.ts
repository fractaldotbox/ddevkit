import type { CodegenConfig } from "@graphql-codegen/cli";

// Document mode is used for smaller bundle size
// https://github.com/mswjs/msw/issues/1583

// https://github.com/dotansimha/graphql-code-generator/discussions/8707

const config: CodegenConfig = {
	// schema: 'https://easscan.org/graphql/index',
	// documents: ['../../apps/storybook/src/**/*.ts','../../apps/storybook/src/**/*.tsx'],
	ignoreNoDocuments: true,
	generates: {
		"./src/graphql/eas/": {
			preset: "client",
			documents: ["../../packages/ui-react/src/lib/eas/**/*.ts"],
			schema: "https://easscan.org/graphql",
			presetConfig: {
				gqlTagName: "gql",
			},
			config: {
				documentMode: "string",
			},
		},
		// note new endpoint for mainnet
		// https://discuss.ens.domains/t/ens-subgraph-migration-to-the-decentralised-version/19183
		"./src/graphql/ens/": {
			preset: "client",
			documents: ["../../packages/ui-react/src/lib/ens/**/*.ts"],
			schema:
				"https://api.studio.thegraph.com/query/49574/enssepolia/version/latest",
			presetConfig: {
				gqlTagName: "gql",
			},
			config: {
				documentMode: "string",
			},
		},
	},
};

//

export default config;
