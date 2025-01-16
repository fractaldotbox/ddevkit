import type { TransactionMeta } from "@geist/domain/transaction/transaction";
import { useQuery } from "@tanstack/react-query";
import type { TokenPriceEntry } from "#components/token/token-price-entry.js";
import { asTokenPriceEntry, getPrices } from "#lib/defillama/api";

export const CACHE_KEY = "defillama";

export const useGetPriceWithMultipleTokenIds = (tokenIds: string) => {
	return useQuery<{ [tokenId: string]: TokenPriceEntry[] }>({
		queryKey: [`${CACHE_KEY}.price`, tokenIds],
		queryFn: async () => {
			const priceDataByTokenId = await getPrices(tokenIds);

			return Object.fromEntries(
				Object.entries(priceDataByTokenId).map(([tokenId, priceData]) => {
					return [tokenId, priceData.map(asTokenPriceEntry)];
				}),
			);
		},
	});
};
