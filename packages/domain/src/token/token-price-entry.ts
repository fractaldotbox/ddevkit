import type { Token } from "./token";

export type TokenPriceEntry = Partial<Token> & {
	happenAt?: number;
	price: number;
};
