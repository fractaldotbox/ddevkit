/**
 *
 * Token image is not on-chain as it's not part-of the ERC20 standard)
 * Wagmi has that of native token as chain info
 *
 * Token logos on Etherscan are added by contract owner after verifications.
 * Blockscout api use coingecko hosted asset
 * Trust wallet maintain assets on https://github.com/trustwallet/assets
 *
 * Alternatively, we could create a proxy that accept token address and chain id
 *
 */

import { resolveProductionChain } from "@repo/domain/chain/chain-resolver";
// import { useReadContracts } from "wagmi";
import { Config, readContracts } from "@wagmi/core";
import { useEffect, useState } from "react";
import { Address, Chain, erc20Abi } from "viem";

export type Token = {
	address?: Address;
	imageUrl?: string;
	decimals: number;
	name: string;
	symbol: string;
	type?: string;
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

export const useTokenInfo = ({
	address,
	chain,
	config,
}: { address?: Address; chain: Chain; config: Config }) => {
	const imageUrl = getTrustWalletIconUrl(chain, address);

	const { nativeCurrency } = chain;

	const [tokenInfo, setTokenInfo] = useState<any>(undefined);

	const fetchTokenInfo = async (address: Address) => {
		const results = await readContracts(config, {
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

		if (results) {
			const [decimals, name, symbol, totalSupply] = results;
			return {
				decimals,
				name,
				symbol,
				totalSupply,
				imageUrl,
			};
		}
	};

	useEffect(() => {
		(async () => {
			if (address) {
				const tokenInfo = await fetchTokenInfo(address);
				setTokenInfo(tokenInfo);
				console.log("setup tokenInfo", tokenInfo);
			}
		})();
	}, [address]);

	if (!address) {
		const data = {
			imageUrl,
			...nativeCurrency,
		};
		return {
			data,
		};
	}

	return {
		data: tokenInfo,
	};
};
