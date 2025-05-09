import { Card } from "#components/shadcn/card.js";
import { cn } from "#lib/shadcn/utils.js";
import React, { type HTMLAttributes, type PropsWithChildren } from "react";
import { NFTProvider } from "./components/provider";
import type { Address } from "viem";
import { NFTMedia } from "./components/nft-media";
import { NFTTitle } from "./components/nft-title";
import { NFTContent } from "./components/nft-content";
import { NFTOwner } from "./components/nft-owner";

function NFTCardDefaultContent() {
	return (
		<>
			<NFTMedia />
			<NFTContent>
				<NFTTitle />
				<NFTOwner />
			</NFTContent>
		</>
	);
}

interface NFTCardProps extends HTMLAttributes<HTMLDivElement> {
	tokenId: string;
	contractAddress: string;
}

export const NFTCard = React.forwardRef<
	HTMLDivElement,
	PropsWithChildren<NFTCardProps>
>(
	(
		{
			tokenId,
			contractAddress,
			children = <NFTCardDefaultContent />,
			className,
			...props
		},
		ref,
	) => {
		return (
			<NFTProvider
				contractAddress={contractAddress as Address}
				tokenId={tokenId}
			>
				<Card
					ref={ref}
					className={cn(
						"flex w-full max-w-[500px] flex-col items-stretch gap-1.5 border overflow-hidden text-left",
						className,
					)}
					{...props}
				>
					{children}
				</Card>
			</NFTProvider>
		);
	},
);

NFTCard.displayName = "NFTCard";
