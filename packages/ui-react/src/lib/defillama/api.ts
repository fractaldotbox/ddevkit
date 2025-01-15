import ky, { type DownloadProgress } from "ky";
import type { Chain } from "viem";

const ENDPOINT = "https://api.llama.fi";
const ENDPOINT_COINS = "https://coins.llama.fi";

export const asCoinId = ({
	chain,
	address,
}: {
	chain: Chain;
	address: string;
}) => `${chain.name.toLowerCase()}:${address}`;

export async function getPrices(tokenIds: string) {
	const response = await ky(
		`${ENDPOINT_COINS}/prices/current/${tokenIds}?` +
			new URLSearchParams({
				searchWidth: "4h",
			}).toString(),
	);
	return await response.json();
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
