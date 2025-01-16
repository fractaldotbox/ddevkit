"use client";

import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import { asCaip19Id } from "@geist/domain/token/cross-chain.js";
import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry.js";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { Address, Chain } from "viem";
import { useGetPriceWithMultipleTokenIds } from "#hooks/data/use-defillama.js";
import { TokenPriceChartWithFeed } from "./token-price-chart-with-feed";

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
} satisfies ChartConfig;

export const TokenPriceChart = ({
	chain,
	address,
}: {
	chain: Chain;
	address: Address;
}) => {
	const { data: tokenPriceFeedByTokenId } = useGetPriceWithMultipleTokenIds(
		"ethereum:0xdF574c24545E5FfEcb9a659c229253D4111d87e1",
	);

	console.log("tokenPriceFeed", tokenPriceFeedByTokenId);

	return (
		<TokenPriceChartWithFeed
			tokenPriceFeedByTokenId={tokenPriceFeedByTokenId}
		/>
	);
};
