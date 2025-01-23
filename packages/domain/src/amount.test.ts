import { describe, expect, test } from "vitest";
import { formatUnitsWithLocale } from "./amount";

describe("amount", () => {
	describe("formatUnitsWithLocale", () => {
		test("formats number with locale options", () => {
			const result = formatUnitsWithLocale({
				value: 1234567890000n,
				exponent: 9,
				locale: new Intl.Locale("en-US"),
				formatOptions: {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					style: "currency",
					currency: "USD",
				},
			});
			expect(result).toBe("$1,234.57");
		});

		test("handles different locales", () => {
			const result = formatUnitsWithLocale({
				value: 123456789000n,
				exponent: 9,
				locale: new Intl.Locale("de-DE"),
				formatOptions: {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			});
			expect(result).toBe("1.234.567,00");
		});

		test("handles zero value", () => {
			const result = formatUnitsWithLocale({
				value: BigInt(0),
				exponent: 2,
				formatOptions: {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			});
			expect(result).toBe("0.00");
		});

		test("handles no options ", () => {
			const result = formatUnitsWithLocale({
				value: BigInt(0),
				exponent: 9,
			});
			expect(result).toBe("0.00");
		});
	});
});
