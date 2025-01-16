import ky, { type DownloadProgress } from "ky";
import type { Chain } from "viem";
import type { TokenPriceEntry } from "#components/token/token-price-entry.js";

const ENDPOINT = "https://api.llama.fi";
const ENDPOINT_COINS = "https://coins.llama.fi";

export const asCoinId = ({
	chain,
	address,
}: {
	chain: Chain;
	address: string;
}) => `${chain.name.toLowerCase()}:${address}`;

export type DefillamaPriceEntry = { timestamp: number; price: number };

export async function getPrices(
	tokenIds: string,
): Promise<{ [tokenId: string]: TokenPriceEntry[] }> {
	const response = await ky(
		`${ENDPOINT_COINS}/prices/current/${tokenIds}?` +
			new URLSearchParams({
				searchWidth: "4h",
			}).toString(),
	);
	const priceDataByTokenId = await response.json();

	return Object.fromEntries(
		Object.entries(
			priceDataByTokenId as Record<string, DefillamaPriceEntry[]>,
		).map(([tokenId, priceData]) => {
			return [tokenId, priceData.map(asTokenPriceEntry)];
		}),
	);
}

export async function getChart(tokenIds: string) {
	console.log(tokenIds);
	const response = await ky(
		`${ENDPOINT_COINS}/chart/${tokenIds}?` +
			new URLSearchParams({
				start: "1664364537",
				span: "10",
				// end: "1736827311",
				// searchWidth: "600",
			}).toString(),
	);
	return await response.json();
}

export async function getProtocols() {
	const response = await ky(`${ENDPOINT}/protocols`);
	return await response.json();
}

export const asTokenPriceEntry = (priceData: any) => {
	const { timestamp, price } = priceData;
	return {
		happenAt: timestamp,
		price,
	};
};
