import { mainnet } from "viem/chains";
import { describe, expect, it } from "vitest";
import { asCoinId, getChart, getPrices } from "./api";

describe("defillama api", () => {
	it("#prices of coins", async () => {
		const prices = await getPrices(
			"ethereum:0xdF574c24545E5FfEcb9a659c229253D4111d87e1,coingecko:ethereum,bsc:0x762539b45a1dcce3d36d080f74d1aed37844b878,ethereum:0xdB25f211AB05b1c97D595516F45794528a807ad8",
		);

		expect(prices.coins["coingecko:ethereum"]).toBeDefined();
	});
	it("#chart", async () => {
		const coinId = asCoinId({
			chain: mainnet,
			address: "0xdF574c24545E5FfEcb9a659c229253D4111d87e1",
		});
		const chart = await getChart(coinId);

		console.log("chart", chart.coins[coinId].prices);
	});
});
