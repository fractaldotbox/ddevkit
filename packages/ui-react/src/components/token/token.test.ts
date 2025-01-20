import { mainnet } from "viem/chains";
import { describe, expect, test } from "vitest";
import type { Config } from "wagmi";
import { WAGMI_CONFIG } from "#lib/utils/wagmi-config.js";
import { fetchTokenInfoBulkAction } from "./token";
// Mock readContracts
// vi.mock("@wagmi/core", () => ({
// 	readContracts: vi.fn().mockResolvedValue([
// 		8, // decimals
// 		"Test Token", // name
// 		"TST", // symbol
// 		1000000000000000000n, // totalSupply
// 		18, // decimals for second token
// 		"Second Token", // name for second token
// 		"SEC", // symbol for second token
// 		2000000000000000000n, // totalSupply for second token
// 	]),
// }));

describe("fetchTokenInfoBulkAction", () => {
	test("should fetch token info for multiple tokens", async () => {
		// Mock config
		const config = WAGMI_CONFIG;

		// Test tokens
		const tokens = [
			{ address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", chainId: 1 },
			{ address: "0xdac17f958d2ee523a2206206994597c13d831ec7", chainId: 1 },
		];

		const results = await fetchTokenInfoBulkAction(config, 1)(tokens);

		// expect(Object.keys(results)).toEqual([]);

		console.log("results", results);
		// Verify first token results
		const token =
			results["eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"];
		const { decimals, name, symbol, totalSupply } = token;
		expect(decimals).toBe(6); // decimals
		expect(totalSupply > 30646276803710503n).toBe(true);
	});
});
