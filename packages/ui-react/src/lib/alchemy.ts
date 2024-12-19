/**
 * here only add notable chains for testing. For other chains, use viem default
 * or pass public rpc found on https://chainlist.org/
 */

import { arbitrum, mainnet, optimism, sepolia } from "viem/chains";

export const ALCHEMY_ENDPOINT_BY_CHAIN_ID = {
	[mainnet.id]: `https://eth-mainnet.g.alchemy.com/v2/`,
	[sepolia.id]: `https://eth-sepolia.g.alchemy.com/v2/`,
	[optimism.id]: `https://opt-mainnet.g.alchemy.com/v2/`,
	[arbitrum.id]: `https://arb-mainnet.g.alchemy.com/v2/`,
} as Record<number, string>;

export const getAlchemyEndpoint = (chainId: number, apiKey?: string) => {
	const endpoint = ALCHEMY_ENDPOINT_BY_CHAIN_ID[chainId];
	if (!endpoint || !apiKey) {
		return;
	}
	return `${endpoint}${apiKey}`;
};
