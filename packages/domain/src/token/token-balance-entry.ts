import type { Address } from "viem";

export type TokenBalance = {
	name?: string;
	symbol: string;
	address: Address;
	amount: bigint;
	chainId: number;
	price?: number;
	decimals?: number;
	value?: bigint;
};

// For grouped rows potentially cross chain
export type TokenBalanceEntry = {
	name?: string;
	symbol: string;
	address?: Address;
	amount: bigint;
	chainId: number;
	price?: number;
	decimals?: number;
	value?: bigint;
	subEntries?: TokenBalanceEntry[];
};
