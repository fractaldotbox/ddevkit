import { Button } from "@/components/ui/button";
import { formatGwei, formatUnits } from "viem";

/**
 * Amount instead Balance as it could be generic and not belongs to wallet
 */

export type TokenChipWithInfoProps = {
	imageUrl?: string;
	name: string;
	symbol: string;
	// TODO both amount and decimals are required
	amount?: bigint;
	decimals?: number;
	className?: string;
};


// TODO fix value
// TODO add url
export const TokenChipWithInfo = ({
	imageUrl,
	name,
	symbol,
	amount,
	decimals,
	className,
}: TokenChipWithInfoProps) => {
	return (
		<Button variant={"secondary"} className={`py-1 flex gap-3 ${className}`}>
			{!!imageUrl && (
				<img className="h-6" src={imageUrl} alt={`${name}-icon`} />
			)}
			<div className="text-lg font-semibold">{symbol}</div>
			{decimals !== undefined && (
				<span className="text-sm text-muted-foreground">
					{
						symbol === "ETH" ? (
							formatGwei(amount ?? 0n)
						) : formatUnits(amount ?? 0n, decimals)
					}
				</span>
			)}
		</Button>
	);
};
