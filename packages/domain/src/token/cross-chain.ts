// TODO db based

import type { TokenSelector } from "./token";

// consider main chain as canonical asset

// TODO chainIdCaip19 CAIP-19 eip155: prefix
export const TOKEN_CROSS_CHAIN = [
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

export const groupCrosschainTokens = (tokenBalances: any[]) => {
	const grouped = Object.groupBy(tokenBalances, (tokenBalance) => {
		// use address instead of symbol to match
		const token = TOKEN_CROSS_CHAIN.find((token) =>
			token.byChain.find((tokenChainMeta) => {
				return tokenChainMeta.symbol === tokenBalance.symbol;
			}),
		);

		if (!token) {
			return tokenBalance.symbol;
		}
		return token.meta.symbol;
	});

	return Object.fromEntries(
		Object.entries(grouped).map(([symbol, tokenBalances]) => {
			// TODO use identifer over symbol
			const token = TOKEN_CROSS_CHAIN.find(
				(token) => token.meta.symbol === symbol,
			);

			return [
				symbol,
				{
					symbol,
					...(token || {}),
					tokenBalances: tokenBalances.map((tokenBalance) => {
						const chainMeta = (token?.byChain || []).find(
							(tokenChainMeta) =>
								tokenChainMeta.chainId === tokenBalance.chainId,
						);

						return {
							...(chainMeta || {}),
							...tokenBalance,
						};
					}),
					amount: tokenBalances.reduce(
						(acc, tokenBalance) => acc + tokenBalance.amount,
						0,
					),
				},
			];
		}),
	);
};
