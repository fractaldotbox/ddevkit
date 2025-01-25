// TODO cross-check blockscout

import { faker } from "@faker-js/faker";
import { subHours } from "date-fns";
import type { TokenPriceEntry } from "./token-price-entry";

// TODO confirm price modelfor multi-chain assets

export const PRICE_DATA_FEED = [
	{ happenAt: 1664364295, price: 0.9935534119681249 },
	{ happenAt: 1664451015, price: 0.9945405382806103 },
	{ happenAt: 1664537423, price: 0.9914483744619215 },
	{ happenAt: 1664623579, price: 0.9931501362122901 },
	{ happenAt: 1664709926, price: 0.9885029770209419 },
	{ happenAt: 1664796631, price: 0.9965279854794221 },
	{ happenAt: 1664883123, price: 0.9914113855913221 },
] as TokenPriceEntry[];

export const generatePriceDataFeed = (
	count: number,
	endTime: Date,
): TokenPriceEntry[] => {
	return Array.from({ length: count }).map((_, i) => ({
		happenAt: subHours(endTime, i).getTime() / 1000,
		price: parseFloat(faker.finance.amount({ min: 5, max: 10, dec: 2 })),
	}));
};

export const PRICE_DATA_SNAPSHOT = [
	{
		chainId: 1,
		symbol: "USDC",
		address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
		price: 1.0,
	},
	{
		chainId: 8453,
		symbol: "USDC",
		address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
		price: 1.0,
	},
	{
		chainId: 1,
		symbol: "USDT",
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		price: 1.0,
	},
	{
		chainId: 8453,
		symbol: "USDT",
		address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
		price: 1.0,
	},
	{
		symbol: "OP",
		chainId: 10,
		address: "0x4200000000000000000000000000000000000042",
		price: 2.1,
	},
] as TokenPriceEntry[];

export const TOKEN_BALANCES_MULTIPLE_STABLECOINS = [
	{
		chainId: 1,
		address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
		decimals: 6,
		amount: 111111n,
		symbol: "USDC",
		name: "USD Coin",
	},
	{
		chainId: 8453,
		address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
		decimals: 6,
		amount: 222222n,
		symbol: "USDC",
		name: "USD Coin",
	},
	{
		chainId: 1,
		address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
		symbol: "USDT",
		decimals: 6,
		amount: 333333n,
		name: "USD Tether",
	},

	{
		chainId: 1,
		address: "0xfde4c96c8593536e31f229ea8f37b2ada2699bb2",
		symbol: "USDT",
		decimals: 6,
		amount: 444444n,
		name: "USD Tether",
	},

	{
		chainId: 10,
		address: "0x4200000000000000000000000000000000000042",
		symbol: "OP",
		decimals: 6,
		amount: 555555n,
		name: "Optimism",
	},
];
