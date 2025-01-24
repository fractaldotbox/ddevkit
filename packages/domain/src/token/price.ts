export type Price = {
	value: bigint;
};

// return price value in bigint with desired decimals
export const asPriceValue = (amount: bigint, price: number, decimals = 18) => {
	if (isNaN(price)) {
		return 0n;
	}

	// TODO precision handling
	return amount * BigInt(price * 10 ** decimals);
};
