import { mainnet } from "viem/chains";
import { describe, expect, test } from "vitest";
import type { Config } from "wagmi";
import { BY_CHAIN_ID, Token } from "#lib/token/config";
import { WAGMI_CONFIG } from "#lib/utils/wagmi-config.js";
import { fetchTokenInfoBulkAction, getTrustWalletIconUrl } from "./token";
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

	test("#getTrustWalletIconUrl", () => {
		const exists = getTrustWalletIconUrl(
			mainnet,
			BY_CHAIN_ID[mainnet.id]![Token.USDC]!,
		);

		const notchecksumed = getTrustWalletIconUrl(
			mainnet,
			BY_CHAIN_ID[mainnet.id]![Token.USDC]!,
		);

		const native = getTrustWalletIconUrl(mainnet);

		const nonExists = getTrustWalletIconUrl(
			mainnet,
			"0x6b175474e89094c44da98b954eedeac495271d0f",
		);

		expect(exists).toBe(
			"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
		);

		expect(notchecksumed).toBe(
			"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
		);

		expect(native).toBe(
			"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png",
		);

		// 404: Not Found
		expect(nonExists).toBe(
			"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png",
		);
	});
});
