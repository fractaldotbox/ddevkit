// Could use radix 16
export const stringifyWithBigInt = (obj: any) =>
	JSON.stringify(obj, (_, value) =>
		typeof value === "bigint" ? value.toString() : value,
	);
