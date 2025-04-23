/**
 * prefer raw-framework agnositc env variable key
 * establish convention here and rely on VITE to load for now
 *
 * to be genearted with shadcn cli
 */

export default {
	onchainkit: {
		apiKey: process.env.ONCHAINKIT_API_KEY,
	},
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
	passport: {
		endpointUrl:
			process.env.PASSPORT_API_ENDPOINT_URL || "https://api.passport.xyz",
		apiKey: process.env.PASSPORT_API_KEY,
		scorerId: Number(process.env.PASSPORT_SCORER_ID) || 11347,
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
