import { describe, expect, it } from "vitest";
import { groupCrosschainTokens } from "#token/cross-chain";
import { TOKEN_BALANCES_MULTIPLE_STABLECOINS } from "#token/token-balance.fixture";

describe("cross-chain", () => {
	it("#groupCrosschainTokens", () => {
		const grouped = groupCrosschainTokens(TOKEN_BALANCES_MULTIPLE_STABLECOINS);
		expect(grouped.USDC.amount).toEqual(69135780);
		expect(grouped.USDT.byChain[0].symbol).toEqual("USDT");

		console.log("grouped", grouped);
	});
});
