import { formatUnits } from "viem";

/**
 * compared to formatUnits from viem
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

	const currency =
		formatOptions?.style === "currency"
			? formatOptions?.currency || "USD"
			: undefined;

	return (Number(value) / e).toLocaleString(locale, {
		...formatOptions,
		currency,
		maximumFractionDigits: formatOptions?.maximumFractionDigits ?? 2,
	});
};
