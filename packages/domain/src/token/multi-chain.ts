import { type Atom, computed } from "nanostores";
import { groupBy } from "#util";
import type { TokenSelector } from "./token";
import type { TokenBalanceEntry } from "./token-balance-entry";
import type { TokenPriceEntry } from "./token-price-entry";

// consider main chain as canonical asset

export const TOKEN_MULTI_CHAIN = [
	{
		meta: {
			symbol: "USDC",
			type: "stablecoin",
		},
		byChain: [
			{
				chainId: "1",
				address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
				decimals: 6,
				symbol: "USDC",
				name: "USD Coin",
			},
			{
				chainId: "8453",
				address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
				symbol: "USDC",
				decimals: 6,
			},
		],
	},
	{
		meta: {
			symbol: "USDT",
			type: "stablecoin",
		},
		byChain: [
			{
				chainId: "1",
				address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
				symbol: "USDT",
				decimals: 6,
				name: "USD Coin",
				type: "stablecoin",
			},
			{
				chainId: "8453",
				address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
				symbol: "USDT",
				decimals: 6,
				name: "USD Coin",
				type: "stablecoin",
			},
		],
	},
];

export const asCaip19Id = (token: TokenSelector) => {
	return `eip155:${token.chainId}/erc20:${token.address}`;
};

/**
 * Token could have different address across different chain (L2, or solana etc)
 * group by symbol or from known list of meta token
 * const byMetaToken = ()=>{
 *   // find meta token e.g. TOKEN_MULTI_CHAIN via selector
 *   //
 * 	}
 */

export const aggregate = (grouped: Record<string, any>) => {
	return Object.fromEntries(
		Object.entries(grouped).map(([symbol, tokenBalances]) => {
			return [
				symbol,
				{
					symbol,
					tokenBalances,
					amount: tokenBalances.reduce(
						(acc, tokenBalance) => acc + tokenBalance.amount,
						0n,
					),
				},
			];
		}),
	);
};

export const withValue = (
	tokenBalance: TokenBalance,
	priceData: TokenPriceEntry[],
) => {
	const { chainId, address } = tokenBalance;
	if (!priceData?.[0]) {
		return tokenBalance;
	}

	const tokenId = asCaip19Id({ chainId, address });
	const price =
		priceData.find(
			({ chainId, address }: any) =>
				asCaip19Id({ chainId, address }) === tokenId,
		)?.price || 1.0;

	const decimals = 18;
	return {
		...tokenBalance,
		price,
		value: tokenBalance.amount * BigInt((price as number) * 10 ** decimals),
	};
};

/**
 * provide metadata while separate concern of aggregating etc
 *
 */
export const groupMultichainToken = (tokenBalances: TokenBalanceEntry[]) => {
	const grouped = groupBy(tokenBalances, (tokenBalance) => {
		return tokenBalance.symbol;
	});

	return Object.entries(grouped).reduce(
		(acc, [symbol, tokenBalances]) => {
			acc[symbol] = {
				symbol,
				tokenBalances: tokenBalances as TokenBalanceEntry[],
			};
			return acc;
		},
		{} as Record<
			string,
			{
				symbol: string;
				tokenBalances: TokenBalanceEntry[];
			}
		>,
	);
};
