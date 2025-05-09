import { CardTitle } from "#components/shadcn/card.js";
import { cn } from "#lib/shadcn/utils.js";
import React from "react";
import { useNFT } from "./provider";

export const NFTTitle = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { nftData } = useNFT();

	return (
		<CardTitle ref={ref} className={cn(className)} {...props}>
			{nftData?.metadata?.name}
		</CardTitle>
	);
});

NFTTitle.displayName = "NFTTitle";
