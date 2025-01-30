// Could use radix 16
export const stringifyWithBigInt = (obj: any) =>
	JSON.stringify(obj, (_, value) =>
		typeof value === "bigint" ? value.toString() : value,
	);

// replace with native Object.groupBy once bump to es2024
export const groupBy = <K extends string, V>(
	iter: any[],
	by: (v: any) => any,
) => {
	return iter.reduce(
		(r, v, i, a, k = by(v)) => ((r[k] || (r[k] = [])).push(v), r),
		{},
	) as Record<K, V>;
};
