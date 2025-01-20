import { describe, test , expect } from "vitest";
import { fetchTokenInfoBulkAction } from "./token";
import { mainnet } from "viem/chains";
import type { Config } from "wagmi";
import { WAGMI_CONFIG } from "#lib/utils/wagmi-config.js";
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
		const config = WAGMI_CONFIG

		// Test tokens
		const tokens = [
			{ address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", chainId: 1 },
            { address: "0xdac17f958d2ee523a2206206994597c13d831ec7", chainId: 1 },
		];

		const results = await fetchTokenInfoBulkAction(config)(tokens);

		// expect(Object.keys(results)).toEqual([]);

        console.log('results',results);
		// Verify first token results
		expect(results[0]).toBe(6); // decimals
		// expect(results[1]).toBe("Test Token"); // name
		// expect(results[2]).toBe("TST"); // symbol
		// expect(results[3]).toBe(1000000000000000000n); // totalSupply

		// // Verify second token results
		// expect(results[4]).toBe(18); // decimals

    })
});