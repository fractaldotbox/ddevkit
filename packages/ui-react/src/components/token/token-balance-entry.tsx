export type TokenBalanceEntry = {
	symbol: string;
	amount: string;
	chainId?: string;
	price?: number;
	value?: number;
	subRows?: TokenBalanceEntry[];
};
