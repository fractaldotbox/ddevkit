import { formatUnits } from "viem";

export const formatUnitsWithDecimalsDisplayed = (
	data: {
		value: bigint;
		decimals: number;
	},
	decimalsDisplayed = 4,
) => {
	return formatUnits(
		data.value / BigInt(Math.pow(10, data?.decimals - decimalsDisplayed)),
		decimalsDisplayed,
	);
};
