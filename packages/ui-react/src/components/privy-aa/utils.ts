import config from "@geist/domain/config";

export const generatePimlicoRpcUrl = (chainId: number) => {
	const pimlicoApiKey = config.pimlico.apiKey;
	if (!pimlicoApiKey) {
		throw new Error("Missing pimlicoApiKey");
	}
	return `https://api.pimlico.io/v2/${chainId}/rpc?apikey=${pimlicoApiKey}`;
};
