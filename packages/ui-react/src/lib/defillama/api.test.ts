import { asCaip19Id } from "@geist/domain/token/cross-chain.js";
import { mainnet } from "viem/chains";
import { describe, expect, it } from "vitest";
import { asDefillamaTokenId, getChart, getPrices } from "./api";

describe("defillama api", () => {
	it("#prices of coins", async () => {
		const tokens = [
			{
				chainId: mainnet.id,
				address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			},
			{
				// https://eips.ethereum.org/EIPS/eip-7528
				chainId: mainnet.id,
				address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
			},
		];
		const priceByTokenId = await getPrices(tokens);

		const caip19Ids = tokens.map(asCaip19Id);

		expect(priceByTokenId[caip19Ids[0]]![0].happenAt).toBeDefined();
		console.log("prices", priceByTokenId);
	});
	it("#getChart", async () => {
		const tokens = [
			{
				chainId: mainnet.id,
				address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			},
		];
		const pricesByTokenId = await getChart(tokens);

		const tokenId = asCaip19Id(tokens[0]);
		expect(pricesByTokenId[tokenId][0].happenAt).toBeDefined();
	});
});
