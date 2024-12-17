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
		endpointUrl: ProcessingInstruction.env.AKAVE_ENDPOINT_URL,
	},
};
