import { formatUnitsWithLocale } from "@geist/domain/amount";
import { formatEther, formatGwei, formatUnits } from "viem";
import { Button } from "#components/shadcn/button";

/**
 * Amount instead Balance as it could be generic and not belongs to wallet
 */

export type TokenChipWithInfoProps = {
	imageUrl?: string;
	name?: string;
	symbol: string;
	amount?: bigint;
	value?: bigint;
	decimals?: number;
	maximumFractionDigits?: number;
	className?: string;
	isShowValue?: boolean;
};

// TODO fix value
// TODO add url
export const TokenChipWithInfo = ({
	imageUrl,
	name,
	symbol,
	amount,
	value,
	decimals,
	maximumFractionDigits = 2,
	className,
	isShowValue = false,
}: TokenChipWithInfoProps) => {
	return (
		<Button variant={"secondary"} className={`py-1 flex gap-3 ${className}`}>
			<div className="flex gap-2 justify-center items-center">
				{!!imageUrl && (
					<img className="h-6" src={imageUrl} alt={`${name}-icon`} />
				)}
				<div className="text-lg font-semibold">{symbol}</div>
				<div className="text-sm text-muted-foreground p-2">
					{isShowValue && value
						? formatUnitsWithLocale({
								value: value,
								exponent: decimals,
								formatOptions: {
									style: "currency",
								},
							})
						: formatUnitsWithLocale({
								value: amount ?? 0n,
								exponent: decimals,
								formatOptions: {
									maximumFractionDigits,
								},
							})}
				</div>
			</div>
		</Button>
	);
};
