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

/**
 * Below are not expected to be published in package
 */
const ALCHEMY_API_KEY =
	import.meta.env.ALCHEMY_API_KEY ||
	import.meta.env.STORYBOOK_ALCHEMY_API_KEY ||
	"";

export const getAlchemyEndpoint = (chainId: number) => {
	const endpoint = ALCHEMY_ENDPOINT_BY_CHAIN_ID[chainId];
	if (!endpoint) {
		return;
	}
	return `${endpoint}${ALCHEMY_API_KEY}`;
};
