import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry";
import type { TokenSelector } from "@geist/domain/token/token.js";
import type { TransactionMeta } from "@geist/domain/transaction/transaction";
import { useQuery } from "@tanstack/react-query";
import {
	asTokenPriceEntry,
	getChart,
	getPrices,
	getProtocolFees,
} from "#lib/defillama/api";

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
		queryKey: [`${CACHE_KEY}.price`, tokens],
		queryFn: async () => {
			const priceDataByTokenId = await getPrices(tokens);
			return priceDataByTokenId;
		},
	});
};

export const useGetProtocolRevenue = (protocolSlug: string) => {
	return useQuery({
		queryKey: [`${CACHE_KEY}.protocol.revenue`, protocolSlug],
		queryFn: async () => {
			const results = await getProtocolFees(protocolSlug, "dailyFees");

			const { totalDataChart } = results;
			// TODO align time format

			return {
				...results,
				totalDataChart,
			};
		},
	});
};
