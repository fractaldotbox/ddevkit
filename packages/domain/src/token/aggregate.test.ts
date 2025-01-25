import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { aggregateBySymbol, tokenBalanceStore } from "./aggregate";

import { atom, cleanStores, keepMount } from "nanostores";
import {
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTIPLE_STABLECOINS,
} from "./token-balance.fixture";
import type { TokenPriceEntry } from "./token-price-entry";

let { $tokenBalances, $priceData } = tokenBalanceStore();

afterEach(() => {
	cleanStores($tokenBalances);
	cleanStores($priceData);
});

describe("aggregate", () => {
	beforeEach(() => {
		keepMount($tokenBalances);
		keepMount($priceData);
	});

	it("#aggregateBySymbol with no price", () => {
		$tokenBalances.set([
			...$tokenBalances.get(),
			...TOKEN_BALANCES_MULTIPLE_STABLECOINS,
		]);

		const $aggregate = aggregateBySymbol($tokenBalances);

		expect($aggregate.get().get()["OP"].agg).toEqual({
			amount: 555555n,
			value: 0n,
		});
	});

	// TODO fix race condition
	it("#aggregateBySymbol with price", () => {
		$tokenBalances.set([
			...$tokenBalances.get(),
			...TOKEN_BALANCES_MULTIPLE_STABLECOINS,
		]);

		$priceData.set([...PRICE_DATA_SNAPSHOT]);

		const $aggregate = aggregateBySymbol($tokenBalances, $priceData);

		expect($aggregate.get().get()["OP"].agg).toEqual({
			amount: 1111110n,
			value: 2333331000000000000000000n,
		});
	});
});
