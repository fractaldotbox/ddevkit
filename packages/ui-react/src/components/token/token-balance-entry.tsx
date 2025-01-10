export const TokenEntryNested = ({ address, amount, chain, className }) => {};

export type TokenBalanceEntry = {
	symbol: string;
	amount: string;
	chainId?: string;
	subRows?: TokenBalanceEntry[];
};
