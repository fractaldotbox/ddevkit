/**
 * Extract logic from presentation component to store
 * we want a structure flexible enough to observe for price change
 * such that value is reactive to price and amount and aggregates reactive its components
 */

import { groupMultichainToken, withValue } from "./multi-chain";
import type { TokenBalanceEntry } from "./token-balance-entry";

import { type Atom, atom, computed, deepMap } from "nanostores";
import type { TokenPriceEntry } from "./token-price-entry";

export const tokenBalanceStore = () => {
	const $tokenBalances = atom<TokenBalanceEntry[]>([]);
	const $priceData = atom<TokenPriceEntry[]>([]);

	return {
		$tokenBalances,
		$priceData,
	};
};

export const aggregateBySymbol = (
	$tokenBalances: Atom<TokenBalanceEntry[]>,
	$priceData?: Atom<TokenPriceEntry[]>,
) => {
	return computed(
		[$tokenBalances, $priceData || atom<TokenPriceEntry[]>([])],
		(
			tokenBalances: TokenBalanceEntry[],
			$priceData: TokenPriceEntry[] = [],
		) => {
			const bySymbol = groupMultichainToken(tokenBalances);

			return Object.entries(bySymbol).reduce((acc, [symbol, tokenInfo]) => {
				const { tokenBalances } = tokenInfo;

				const tokenBalancesWithValue = tokenBalances.map((tokenBalance) =>
					withValue(tokenBalance, $priceData),
				);

				// TODO if empty price data
				console.log("tokenBalancesWithValue", tokenBalancesWithValue);
				const agg = tokenBalancesWithValue.reduce(
					(acc, tokenBalanceWithValue) => {
						return {
							amount: acc.amount + tokenBalanceWithValue.amount,
							value: acc.value + (tokenBalanceWithValue.value || 0n),
						};
					},
					{
						amount: 0n,
						value: 0n,
					},
				);
				console.log("agg", agg);
				acc.setKey(symbol, {
					tokenBalances: tokenBalancesWithValue,
					agg,
				});
				return acc;
			}, deepMap<Record<string, unknown>>({}));
		},
	);
};
