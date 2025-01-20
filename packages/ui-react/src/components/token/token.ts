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

import { resolveProductionChain } from "@geist/domain/chain/chain-resolver";
import type { TokenSelector } from "@geist/domain/token/token";
// import { useReadContracts } from "wagmi";
import { type Config, readContracts } from "@wagmi/core";
import { useEffect, useState } from "react";
import { type Address, type Chain, erc20Abi } from "viem";
import { asTrustWalletChainName } from "#lib/trustwallet-chain";

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

const chunk = <T>(arr: T[], size: number): T[][] =>
	Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
		arr.slice(i * size, i * size + size),
	);

export const fetchTokenInfoBulkAction =
	(config: Config) => async (tokens: TokenSelector[]) => {
		const selectors = [
			{
				functionName: "name",
			},
			{
				functionName: "decimals",
			},
			{
				functionName: "symbol",
			},
			{
				functionName: "totalSupply",
			},
		];
		const results = await readContracts(config, {
			batchSize: 10,
			allowFailure: false,
			contracts: tokens.flatMap((token) => {
				const address = token.address as Address;

				return selectors.map((selector) => ({
					address,
					abi: erc20Abi,
					...selector,
				}));
			}),
		});

		const chunkedResults = chunk(results, 4).reduce((acc, chunk, idx) => {
			console.log("idx", chunk, idx);
			const [name, decimals, symbol, totalSupply] = chunk;
			const address = tokens[idx % 4]!.address;
			console.log("address", address, acc);
			return {
				...acc,
				[address]: {
					name,
					decimals,
					symbol,
					totalSupply,
				},
			};
		}, {});

		return chunkedResults;
	};

export const useTokenInfoBulk = ({
	tokens,
	config,
}: {
	tokens: TokenSelector[];
	config: Config;
}) => {
	const [tokenInfos, setTokenInfos] = useState<any>(undefined);

	// turn on multicall batch add options to bulk by wagmi

	useEffect(() => {
		(async () => {
			if (tokens) {
				const results = await fetchTokenInfoBulkAction(config)(tokens);

				if (results) {
					console.log("results", results);
					// const [decimals, name, symbol, totalSupply] = results;
					// return {
					// 	decimals,
					// 	name,
					// 	symbol,
					// 	totalSupply,
					// 	imageUrl,
					// };
				}
			}
		})();
	}, [tokens]);

	// if (!address) {
	// 	const data = {
	// 		imageUrl,
	// 		...nativeCurrency,
	// 	};
	// 	return {
	// 		data,
	// 	};
	// }

	return {
		// data: tokenInfo,
	};
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
