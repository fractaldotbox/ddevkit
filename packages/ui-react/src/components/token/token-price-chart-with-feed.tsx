import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import { asCaip19Id } from "@geist/domain/token/cross-chain.js";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
} from "recharts";
import { type Address, type Chain, ChainDisconnectedError } from "viem";
import type { TokenPriceEntry } from "./token-price-entry";

export const TokenPriceChartWithFeed = ({
	tokenPriceFeed,
}: {
	tokenPriceFeed: TokenPriceEntry[];
}) => {
	const chartConfig = {
		ethereum: {
			label: "Ethereum",
			color: "hsl(var(--chart-1))",
		},
	} satisfies ChartConfig;

	// const chartData = tokenPriceFeed.map((entry, i) => {
	// 	return {
	// 		browser: entry.symbol,
	// 		visitors: entry.value || 0,
	// 		fill: `hsl(var(--chart-${i}))`,
	// 	};
	// });
	const chartData = [
		{ date: "2024-04-01", ethereum: 222 },
		{ date: "2024-04-02", ethereum: 97 },
		{ date: "2024-04-03", ethereum: 167 },
		{ date: "2024-04-04", ethereum: 242 },
	];

	return (
		<div className="w-full h-full]">
			<ChartContainer
				config={chartConfig}
				style={{ height: "600px", width: "600px" }}
			>
				<LineChart
					accessibilityLayer
					data={chartData}
					margin={{
						left: 12,
						right: 12,
					}}
				>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="month"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					<Line
						dataKey="ethereum"
						type="natural"
						stroke="var(--color-ethereum)"
						strokeWidth={2}
						dot={false}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
};
