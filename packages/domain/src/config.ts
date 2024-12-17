/**
 * prefer raw-framework agnositc env variable key
 * establish convention here and rely on VITE to load for now
 *
 * to be genearted with shadcn cli
 */

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
	test: {
		eas: {
			privateKey: process.env.TEST_EAS_PRIVATE_KEY,
		},
	},
};
