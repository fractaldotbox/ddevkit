import { Chain, extractChain } from "viem";
import {
	arbitrum,
	arbitrumGoerli,
	arbitrumSepolia,
	base,
	baseGoerli,
	baseSepolia,
	mainnet,
	optimism,
	optimismGoerli,
	optimismSepolia,
	zora,
} from "viem/chains";
import * as chains from "viem/chains";
// importing chains has bundle size impact
// https://viem.sh/docs/utilities/extractChain.html

export const DEFAULT_SUPPORTED_CHAINS = [mainnet, base, optimism, zora];
// TODO build time over run-time
// no standard in chain naming, delimiter can be space, hyphen or none
const CHAIN_ID_BY_NAME = Object.fromEntries(
	Object.values(chains)
		.map((chain) => [chain.name.toLowerCase().replace(/ /, ""), chain.id])
		.concat([
			// alias
			// opmainnet
			["optimism", optimism.id],
			// arbitrumone
			["arbitrum", arbitrum.id],
			// OP Sepolia
			["optimismsepolia", optimismSepolia.id],
		]),
);

/**
 * Non reliable and best effort basis
 */
export const resolveChainWithName = (
	name: string,
	chains: Chain[] = DEFAULT_SUPPORTED_CHAINS,
): Chain | null => {
	const chainId = CHAIN_ID_BY_NAME[name];

	return extractChain({
		chains,
		id: chainId,
	});
};

/**
 * Many scenarios we want to find production chain of a testnet chain
 * e.g. to find logo to use
 * https://wagmi.sh/react/api/chains
 *
 * We refers to "ProductionChain" as mainnet refers to Ethereum mainnet
 *
 * That is not deducible from chain definition https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts
 */
export const resolveProductionChain = (chain: Chain) => {
	return (
		{
			[optimismSepolia.id]: optimism,
			[optimismGoerli.id]: optimism,
			[baseSepolia.id]: base,
			[baseGoerli.id]: base,
			[arbitrumGoerli.id]: arbitrum,
			[arbitrumSepolia.id]: arbitrum,
		}[chain.id] || chain
	);
};
