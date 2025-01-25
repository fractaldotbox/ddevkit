import type { Address } from "viem";

export type TokenBalanceEntry = {
	symbol: string;
	address: Address;
	amount: bigint;
	chainId: number;
	price?: number;
	value?: bigint;
	subEntries?: TokenBalanceEntry[];
};
