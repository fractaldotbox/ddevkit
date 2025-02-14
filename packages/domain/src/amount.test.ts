import { describe, expect, test } from "vitest";
import { formatNumberWithLocale, formatUnitsWithLocale } from "./amount";

describe("amount", () => {
	describe("#formatNumberWithLocale", () => {
		test("format non currency", () => {
			const result = formatNumberWithLocale({
				value: 1234.567,
				locale: new Intl.Locale("en-US"),
			});
			expect(result).toBe("1,234.57");
		});

		test("format currency", () => {
			const result = formatNumberWithLocale({
				value: 1234.567,
				locale: new Intl.Locale("en-US"),
				formatOptions: {
					style: "currency",
				},
			});
			expect(result).toBe("$1,234.57");
		});
	});
	describe("formatUnitsWithLocale", () => {
		test("format units with locale options", () => {
			const result = formatUnitsWithLocale({
				value: 1234567890000n,
				exponent: 9,
				locale: new Intl.Locale("en-US"),
				formatOptions: {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					style: "currency",
				},
			});
			expect(result).toBe("$1,234.57");
		});

		test("formats number with locale options", () => {
			const result = formatUnitsWithLocale({
				value: undefined,
				formatOptions: {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
					style: "currency",
				},
			});
			expect(result).toBe("");
		});

		test("handles different locales", () => {
			const result = formatUnitsWithLocale({
				value: 1234567890000n,
				exponent: 9,
				locale: new Intl.Locale("de-DE"),
				formatOptions: {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				},
			});
			expect(result).toBe("1.234,57");
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
			expect(result).toBe("0");
		});
	});
});
