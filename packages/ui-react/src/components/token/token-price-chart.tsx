"use client";

import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import { asCaip19Id } from "@geist/domain/token/cross-chain.js";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { Address, Chain } from "viem";
import { TokenPriceChartWithFeed } from "./token-price-chart-with-feed";
import type { TokenPriceEntry } from "./token-price-entry";

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
} satisfies ChartConfig;

export const TokenPriceChart = ({
	chain,
	address,
	tokenPriceFeed,
}: {
	chain: Chain;
	address: Address;
	tokenPriceFeed: TokenPriceEntry[];
}) => {
	// const chartData = tokenPriceFeed.map((entry, i) => {
	// 	return {
	// 		browser: entry.symbol,
	// 		visitors: entry.value || 0,
	// 		fill: `hsl(var(--chart-${i}))`,
	// 	};
	// });

	const capi19Id = asCaip19Id(chain.id, address);

	const chartData = [
		{ date: "2024-04-01", desktop: 222, mobile: 150 },
		{ date: "2024-04-02", desktop: 97, mobile: 180 },
		{ date: "2024-04-03", desktop: 167, mobile: 120 },
		{ date: "2024-04-04", desktop: 242, mobile: 260 },
	];

	return <TokenPriceChartWithFeed tokenPriceFeed={[]} />;
};
