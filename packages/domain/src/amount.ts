import { formatUnits } from "viem";

/**
 * compared to formatUnits from viem
 * besides expotent handling, also take control of decimals displayed and locale concern
 */

export const formatUnitsWithLocale = ({
	value,
	exponent,
	locale,
	formatOptions,
}: {
	value: bigint;
	exponent: number;
	locale?: Intl.Locale;
	formatOptions: Intl.NumberFormatOptions;
}) => {
	// losing precision
	const e = Math.pow(10, exponent);

	return (Number(value) / e).toLocaleString(locale, formatOptions);
};
