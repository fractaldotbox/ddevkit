import type { Address } from "viem";
import { asCaip19Id } from "./cross-chain";

export type Token = {
	address?: Address;
	imageUrl?: string;
	decimals: number;
	name: string;
	symbol: string;
	type?: string;
};

// TODO if price not available
export const asPriceValue = (amount, price) => {
	if (isNaN(price) || isNaN(amount)) {
		return 0;
	}
	return price * amount;
};

export const asTokenBalanceEntries = (tokenGroup, priceData) => {
	const entries = Object.entries(tokenGroup).map(
		([symbol, { meta, amount, tokenBalances = [] }]) => {
			const subEntries = tokenBalances.map(
				({ chainId, address, symbol, amount }) => {
					const tokenId = asCaip19Id(chainId, address);
					const price = priceData.find(
						({ chainId, address }) => asCaip19Id(chainId, address) === tokenId,
					)?.price;

					console.log("price", price, tokenId);
					return {
						chainId,
						symbol,
						amount,
						price,

						value: asPriceValue(amount, price),
					};
				},
			);

			return {
				symbol,
				amount,
				subEntries,
				value: subEntries.reduce((acc, { value }) => acc + value, 0),
			};
		},
	);

	return entries.flat();
};
