/**
 * Generally for token metadata / image it is more performant to use indexing services or pre-generate data during build process.
 *
 * useToken and useTokenBulk use rpc directly for minnmized dependency and dynamic token support
 *
 * Token image is not on-chain as it's not part-of the ERC20 standard
 * Wagmi has that of native token as chain info
 *
 * Token logos on Etherscan are added by contract owner after verifications.
 * Blockscout api use coingecko hosted asset
 * Trust wallet maintain assets on https://github.com/trustwallet/assets
 * Defillama use assets from various sources including coingecko https://github.com/DefiLlama/icons
 *   - with custom proxy https://token-icons.llamao.fi/icons/tokens/1/0xc3d688b66703497daa19211eedff47f25384cdc3?h=20&w=20
 *
 * As we don't want to increase bundle size to check if address is included thus url will return 404 in that case
 *
 * Alternatively,
 * - we could create a proxy that accept token address and chain id
 * - create css spirites during build if applicable
 */

import {
	resolveChainById,
	resolveProductionChain,
} from "@geist/domain/chain/chain-resolver";
import { asCaip19Id } from "@geist/domain/token/multi-chain";
import type { TokenSelector } from "@geist/domain/token/token";
// import { useReadContracts } from "wagmi";
import { type Config, readContracts } from "@wagmi/core";
import { useEffect, useState } from "react";
import { type Address, type Chain, erc20Abi, getAddress } from "viem";
import { asTrustWalletChainName } from "#lib/trustwallet-chain";

export type TokenInfo = {
	address: Address;
	imageUrl?: string;
	decimals: number;
	symbol: string;
	name: string;
};

/**
 * trustwallet/assets does not contains most testnet, always fallback to mainnet
 */
export const getTrustWalletIconUrl = (chain: Chain, address?: Address) => {
	const productionChain = resolveProductionChain(chain);

	const twChainName = asTrustWalletChainName(productionChain);

	const ROOT =
		"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains";

	if (!address) {
		return `${ROOT}/${twChainName}/info/logo.png`;
	}

	return `${ROOT}/${twChainName}/assets/${getAddress(address)}/logo.png`;
};

function chunk<T>(arr: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
		arr.slice(i * size, i * size + size),
	);
}

export const fetchTokenInfoBulkAction =
	(config: Config, chainId: number) => async (tokens: TokenSelector[]) => {
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
					chainId,
					abi: erc20Abi,
					...selector,
				}));
			}),
		});

		const chunkedResults = chunk(results, 4).reduce((acc, chunk, idx) => {
			const [name, decimals, symbol, totalSupply] = chunk;
			const address = tokens[idx % 4]!.address;

			const caip19Id = asCaip19Id({ chainId, address });

			const chain = resolveChainById(chainId);
			const imageUrl = chain
				? getTrustWalletIconUrl(chain, address as Address)
				: "";

			console.log("imageUrl", imageUrl);
			return {
				...acc,
				[caip19Id]: {
					address,
					name,
					imageUrl,
					decimals,
					symbol,
					totalSupply,
				},
			};
		}, {});

		return chunkedResults as Record<string, TokenInfo>;
	};

// For now only current chain

export const useTokenInfoBulk = ({
	chainId,
	tokens,
	config,
}: {
	chainId: number;
	tokens: TokenSelector[];
	config: Config;
}) => {
	const [tokenInfo, setTokenInfo] = useState<any>(undefined);

	// turn on multicall batch add options to bulk by wagmi

	useEffect(() => {
		(async () => {
			if (tokens) {
				const byCapid19Id = await fetchTokenInfoBulkAction(
					config,
					chainId,
				)(tokens);

				setTokenInfo(byCapid19Id);
			}
		})();
	}, [tokens]);

	return {
		data: tokenInfo,
	};
};

export const useTokenInfo = ({
	address,
	chainId,
	config,
}: { address?: Address; chainId: number; config: Config }) => {
	const chain = resolveChainById(chainId);
	const imageUrl = chain ? getTrustWalletIconUrl(chain, address) : "";

	const { nativeCurrency } = chain || {};

	const [tokenInfo, setTokenInfo] = useState<any>(undefined);

	const fetchTokenInfo = async (address: Address) => {
		const results = await readContracts(config, {
			allowFailure: false,
			contracts: [
				{
					address,
					chainId,
					abi: erc20Abi,
					functionName: "decimals",
				},
				{
					address,
					chainId,
					abi: erc20Abi,
					functionName: "name",
				},
				{
					address,
					chainId,
					abi: erc20Abi,
					functionName: "symbol",
				},
				{
					address,
					chainId,
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
