import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { aggregateBySymbol, tokenBalanceStore } from "./aggregate";

import { allTasks, atom, cleanStores, keepMount } from "nanostores";
import {
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTICHAIN_STABLECOINS,
} from "./token-balance.fixture";
import type { TokenPriceEntry } from "./token-price-entry";

let { $tokenBalances, $priceData } = tokenBalanceStore();

describe("aggregate", () => {
	beforeEach(() => {
		keepMount($tokenBalances);
		keepMount($priceData);
	});

	afterEach(() => {
		cleanStores($tokenBalances, $priceData);
	});

	it("#aggregateBySymbol with no price", () => {
		$tokenBalances.set([...TOKEN_BALANCES_MULTICHAIN_STABLECOINS]);

		const $aggregate = aggregateBySymbol($tokenBalances);

		expect($aggregate.get().get()["OP"].agg).toEqual({
			amount: 555555n,
			value: 0n,
		});
	});

	it("#aggregateBySymbol with price", async () => {
		$tokenBalances.set([...TOKEN_BALANCES_MULTICHAIN_STABLECOINS]);

		$priceData.set([...PRICE_DATA_SNAPSHOT]);

		const $aggregate = aggregateBySymbol($tokenBalances, $priceData);

		const OP = $aggregate.get().get()["OP"];
		expect(OP.agg).toEqual({
			amount: 555555n,
			value: 1166665500000000000000000n,
		});
		expect(OP.symbol).toEqual("OP");

		expect(OP.subEntries?.[0].chainId).toEqual(10);
		expect(OP.subEntries?.[0].address).toEqual(
			"0x4200000000000000000000000000000000000042",
		);

		const USDC = $aggregate.get().get()["USDC"];
		expect(USDC.agg).toEqual({
			amount: 333333n,
			value: 333333000000000000000000n,
		});
		expect(USDC.subEntries?.[0].chainId).toEqual(1);
		expect(USDC.subEntries?.[0].address).toEqual(
			"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
		);

		$priceData.set([
			...PRICE_DATA_SNAPSHOT.slice(0, -1),
			{
				symbol: "OP",
				chainId: 10,
				address: "0x4200000000000000000000000000000000000042",
				price: 5.2,
			},
		]);
		console.log("price updated");

		// TODO fix reactive

		expect($aggregate.get().get()["OP"].agg).toEqual({
			amount: 555555n,
			value: 2888886000000000000000000n,
		});
	});
});
