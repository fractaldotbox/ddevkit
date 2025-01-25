import { describe, expect, it } from "vitest";
import { groupMultichainToken } from "#token/multi-chain";
import { TOKEN_BALANCES_MULTIPLE_STABLECOINS } from "#token/token-balance.fixture";

describe("multi-chain", () => {
	it("#groupMultichainToken", () => {
		const grouped = groupMultichainToken(TOKEN_BALANCES_MULTIPLE_STABLECOINS);
		expect(grouped.USDC!.amount).toEqual(333333n);

		expect(grouped.USDT!.byChain[0].symbol).toEqual("USDT");

		expect(grouped.USDT!.subEntries[0]).toEqual([]);
	});

	it("#aggregateValueByChain", () => {
		// agg total value, amount
	});
});
