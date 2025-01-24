export type TokenBalanceEntry = {
	symbol: string;
	amount: bigint;
	chainId?: string;
	price?: number;
	value?: bigint;
	subRows?: TokenBalanceEntry[];
};
