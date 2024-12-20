/**
 * prefer raw-framework agnositc env variable key
 * establish convention here and rely on VITE to load for now
 *
 * to be genearted with shadcn cli
 */

// this run at runtime but
// at storybook process.env not longer available and import.meta.env do not include config

export default {
	lighthouse: {
		apiKey: process.env.LIGHTHOUSE_API_KEY,
	},
	akave: {
		endpointUrl: process.env.AKAVE_ENDPOINT_URL,
	},
	storacha: {
		key: process.env.STORACHA_KEY,
		proof: process.env.STORACHA_PROOF,
	},
	alchemy: {
		apiKey: process.env.ALCHEMY_API_KEY,
	},
	test: {
		user: {
			privateKey: process.env.TEST_USER_PRIVATE_KEY,
		},
		eas: {
			privateKey: process.env.TEST_EAS_PRIVATE_KEY,
		},
	},
};
