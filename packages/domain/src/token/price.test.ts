import { describe, expect, it, test } from "vitest";
import { asPriceValue } from "./price";

describe("TokenPrice", () => {
	test("#asPriceValue default", () => {
		const value = asPriceValue(123n, 0.00345);
		expect(value).toEqual(424350000000000000n);
	});
	test("#asPriceValue 6", () => {
		const value = asPriceValue(123n, 0.00345, 6);
		expect(value).toEqual(424350n);
	});
});
