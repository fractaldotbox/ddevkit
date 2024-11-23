/**
 *
 * Token image is not on-chain as it's not part-of the ERC20 standard)
 * Wagmi has that of native token as chain info
 *
 * Token logos on Etherscan are added by contract owner after verifications.
 * Blockscout api use coingecko hosted asset
 * Trust wallet maintain assets on https://github.com/trustwallet/assets
 *
 *
 * Alternatively, we could create a proxy that accept token address and chain id
 *
 */

import { Address, Chain, erc20Abi } from "viem";
import { useReadContracts } from "wagmi";
import { asTrustWalletChainName } from "../chain/trustwallet-chain";
import { resolveProductionChain } from "../chain/chain-resolver";

export const useTokenInfo = ({
	address,
	chain,
}: { address?: Address; chain: Chain }) => {
	const imageUrl = getTrustWalletIconUrl(chain, address);

	const { nativeCurrency } = chain;
	if (!address) {
		const data = {
			imageUrl,
			...nativeCurrency,
		};
		return {
			data,
		};
	}

	const results = useReadContracts({
		allowFailure: false,
		contracts: [
			{
				address,
				abi: erc20Abi,
				functionName: "decimals",
			},
			{
				address,
				abi: erc20Abi,
				functionName: "name",
			},
			{
				address,
				abi: erc20Abi,
				functionName: "symbol",
			},
			{
				address,
				abi: erc20Abi,
				functionName: "totalSupply",
			},
		],
	});

	let data = results.data;
	if (data) {
		const [decimal, name, symbol, totalSupply] = data;
		return {
			...results,
			data: {
				decimal,
				name,
				symbol,
				totalSupply,
				imageUrl,
			},
		};
	}
	return {
		...results,
		data: null,
	};
};

/**
 * trustwallet/assets does not contains most testnet, always fallback to mainnet
 *
 */
export const getTrustWalletIconUrl = (chain: Chain, address?: Address) => {
	// TODO handle special case
	// https://developer.trustwallet.com/developer/listing-new-assets/repository_details#validators-specific-requirements

	const productionChain = resolveProductionChain(chain);

	const twChainName = asTrustWalletChainName(productionChain);
	console.log("twChainName", twChainName);
	const ROOT =
		"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains";
	if (!address) {
		return `${ROOT}/${twChainName}/info/logo.png`;
	}
	return `${ROOT}/${twChainName}/assets/${address}/logo.png`;
};
