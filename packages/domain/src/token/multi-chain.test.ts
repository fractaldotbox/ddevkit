import { describe, expect, it } from "vitest";
import { withValue } from "#token/multi-chain";
import {
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTICHAIN_STABLECOINS,
} from "#token/token-balance.fixture";

describe("multi-chain", () => {
	it("#withValue", () => {
		const [tokenBalance] = TOKEN_BALANCES_MULTICHAIN_STABLECOINS;
		const token = withValue(tokenBalance!, PRICE_DATA_SNAPSHOT);

		expect(token.value).toEqual(111111000000000000000000n);
	});
});
