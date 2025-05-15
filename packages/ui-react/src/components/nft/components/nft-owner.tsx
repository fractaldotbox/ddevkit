import { CardDescription, CardTitle } from "#components/shadcn/card.js";
import { cn } from "#lib/shadcn/utils.js";
import React from "react";
import { useNFT } from "./provider";
import { formatAddress } from "../utils";

export const NFTOwner = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const { nftData } = useNFT();

	return (
		<div
			className={cn("flex items-center justify-between", className)}
			{...props}
		>
			<CardDescription ref={ref}>Owned by</CardDescription>
			<CardDescription
				ref={ref}
				className="text-right font-semibold text-black"
			>
				{nftData?.owner?.ens_domain_name ??
					formatAddress(nftData?.owner?.hash ?? "")}
			</CardDescription>
		</div>
	);
});

NFTOwner.displayName = "NFTOwner";
