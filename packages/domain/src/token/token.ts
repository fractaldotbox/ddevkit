import type { Address } from "viem";

export type Token = {
	address?: Address;
	imageUrl?: string;
	decimals: number;
	name: string;
	symbol: string;
	type?: string;
};
