import type { Transaction } from "viem";
import type { Token } from "../token/token";

// ignore other meta such as supply / volume for now
export type TokenTransfer = Token & {
	amount: bigint;
};

export type TransactionMeta = Partial<Transaction> & {
	displayedTxType: string;
	isSuccess: boolean;
	value: bigint;
	tokenTransfers: TokenTransfer[];
};
