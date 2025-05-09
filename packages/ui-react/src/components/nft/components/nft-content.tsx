import { CardContent } from "#components/shadcn/card.js";
import { cn } from "#lib/shadcn/utils.js";
import React from "react";

export const NFTContent = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
	<CardContent
		ref={ref}
		className={cn("pt-6 space-y-2", className)}
		{...props}
	/>
));

NFTContent.displayName = "NFTContent";
