import { resolveChainById } from "@geist/domain/chain/chain-resolver";
import { asCaip19Id } from "@geist/domain/token/multi-chain";
import type { TokenSelector } from "@geist/domain/token/token";
import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry";
import ky from "ky";

const ENDPOINT = "https://api.llama.fi";
const ENDPOINT_COINS = "https://coins.llama.fi";

export const asDefillamaTokenId = ({
	chainId,
	address,
}: {
	chainId: number;
	address: string;
}) => {
	const chain = resolveChainById(chainId);
	return `${chain?.name?.toLowerCase()}:${address}`;
};

export type DefillamaPriceEntry = { timestamp: number; price: number };

// TODO support specify e.g. coingecko:ethereum for defillama

export const asTokensByDefillamaTokenId = (tokens: TokenSelector[]) => {
	return Object.fromEntries(
		tokens.map((token) => [
			asDefillamaTokenId(token),
			{ ...token, id: asCaip19Id(token) },
		]),
	);
};

// TODO fix result type

export async function getPrices(
	tokens: TokenSelector[],
): Promise<{ [tokenId: string]: TokenPriceEntry[] }> {
	const byTokenId = asTokensByDefillamaTokenId(tokens);

	const tokenIds = Object.keys(byTokenId);

	const response = await ky(
		`${ENDPOINT_COINS}/prices/current/${tokenIds}?` +
			new URLSearchParams({
				searchWidth: "4h",
			}).toString(),
	);
	const results = await response.json<{
		coins: { [tokenId: keyof typeof byTokenId]: TokenPriceEntry[] };
	}>();

	// TODO get longer timestamps
	const priceDataByTokenId = results?.coins;
	return Object.fromEntries(
		Object.entries(priceDataByTokenId).map(([tokenId, priceData]) => {
			return [byTokenId[tokenId]!.id, [asTokenPriceEntry(priceData)]];
		}),
	);
}

export async function getChart(
	tokens: TokenSelector[],
): Promise<{ [tokenId: string]: TokenPriceEntry[] }> {
	const byTokenId = asTokensByDefillamaTokenId(tokens);

	const tokenIds = Object.keys(byTokenId);

	const response = await ky(
		`${ENDPOINT_COINS}/chart/${tokenIds}?` +
			new URLSearchParams({
				start: "1664364537",
				span: "10",
				// end: "1736827311",
				// searchWidth: "600",
			}).toString(),
	);
	const results = await response.json<{
		coins: {
			[tokenId: keyof typeof byTokenId]: {
				symbol: string;
				prices: { timestamp: number; price: number }[];
			};
		};
	}>();

	return Object.fromEntries(
		Object.entries(results.coins).map(([tokenId, priceData]) => {
			const { prices, symbol } = priceData;
			console.log(tokenId, byTokenId, priceData);
			return [byTokenId[tokenId]!.id, prices.map(asTokenPriceEntry)];
		}),
	);
}

export const getProtocols = async () => {
	const response = await ky(`${ENDPOINT}/protocols`);
	return await response.json();
};

export const asTokenPriceEntry = (priceData: any) => {
	const { timestamp, price } = priceData;
	return {
		happenAt: timestamp,
		price,
	};
};

export const getProtocolFees = async (
	protocolSlug: string,
	dataType: string,
) => {
	const response = await ky(
		`${ENDPOINT}/summary/fees/${protocolSlug}?dataType=${dataType}`,
	);

	return await response.json<{
		name: string;
		logo: string;
		totalDataChart: [number, number][];
	}>();
};
