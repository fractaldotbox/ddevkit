import { formatUnits } from "viem";

/**
 *
 * Prefer passing around explicit bigint, decimals for financial values
 * which also result in more isomorphic code
 *
 *
 * Compared to `formatUnits` from viem
 * besides expotent handling, also take control of decimals displayed and locale concern
 */

export const formatUnitsWithLocale = ({
	value,
	exponent = 18,
	locale,
	formatOptions,
}: {
	value?: bigint;
	exponent?: number;
	locale?: Intl.Locale;
	formatOptions?: Intl.NumberFormatOptions;
}) => {
	if (value === undefined) {
		return "";
	}
	const e = Math.pow(10, exponent);
	return formatNumberWithLocale({
		value: Number(value) / e,
		locale,
		formatOptions,
	});
};

/**
 * Reasonable defaults for formatting cryptocurrency values
 * Could use native number.toLocaleString() otherwise
 */

export const formatNumberWithLocale = ({
	value,
	locale,
	formatOptions = {},
}: {
	value: number;
	locale?: Intl.Locale;
	formatOptions?: Intl.NumberFormatOptions;
}) => {
	const currency =
		formatOptions?.style === "currency"
			? formatOptions?.currency || "USD"
			: undefined;

	return value.toLocaleString(locale, {
		currency,
		maximumFractionDigits: formatOptions?.maximumFractionDigits ?? 2,
		...formatOptions,
	});
};
