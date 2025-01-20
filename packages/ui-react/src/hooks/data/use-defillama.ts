import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry";
import type { TransactionMeta } from "@geist/domain/transaction/transaction";
import { useQuery } from "@tanstack/react-query";
import {
	asTokenPriceEntry,
	getChart,
	getPrices,
} from "#lib/defillama/api";
import type { TokenSelector } from "@geist/domain/token/token.js";

export const CACHE_KEY = "defillama";

export const useGetChartWithMultipleTokens = (tokens: TokenSelector[]) => {
	return useQuery<{ [tokenId: string]: TokenPriceEntry[] }>({
		queryKey: [`${CACHE_KEY}.chart`, tokens],
		queryFn: async () => {
			const priceDataByTokenId = await getChart(tokens);
			return priceDataByTokenId;
		},
	});
};

export const useGetPriceWithMultipleTokenIds = (tokens: TokenSelector[]) => {
	return useQuery<{ [tokenId: string]: TokenPriceEntry[] }>({
		queryKey: [`${CACHE_KEY}.chart`, tokens],
		queryFn: async () => {
			const priceDataByTokenId = await getPrices(tokens);
			return priceDataByTokenId;
		},
	});
};
