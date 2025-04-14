import type { Atom } from "nanostores";
import type { Address, Chain } from "viem";
import { asCaip19Id } from "./multi-chain";
import { type Price, asPriceValue } from "./price";
import type { TokenPriceEntry } from "./token-price-entry";

export type Token = {
	chainId?: number;
	address?: Address;
	imageUrl?: string;
	decimals: number;
	name: string;
	symbol: string;
	type?: string;
};

export type TokenSelector = {
	chainId: number;
	address: string;
};
