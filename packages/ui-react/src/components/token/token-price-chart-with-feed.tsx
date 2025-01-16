import { asCaip19Id } from "@geist/domain/token/cross-chain.js";
import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry";
import { format, isSameHour } from "date-fns";
import * as React from "react";
import {
	Area,
	AreaChart,
	CartesianGrid,
	Line,
	LineChart,
	XAxis,
} from "recharts";
import { type Address, type Chain, ChainDisconnectedError } from "viem";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

// Alternatively s3 scale
// https://github.com/recharts/recharts/blob/master/storybook/stories/Examples/TimeSeries.stories.tsx#L97

const filterIntegralTicks = (ticks) => {
	return ticks.filter((tick, index, array) => {
		if (index === 0 || index === array.length - 1) {
			return true;
		}
		const prevTick = array[index - 1];
		const nextTick = array[index + 1];
		const tickDate = new Date(tick);
		const prevTickDate = new Date(prevTick);
		const nextTickDate = new Date(nextTick);

		return (
			!isSameHour(tickDate, prevTickDate) && !isSameHour(tickDate, nextTickDate)
		);
	});
};

// TODO
export type TokenInfo = unknown;

export const TokenPriceChartWithFeed = ({
	tokenPriceFeedByTokenId,
	tokenInfoByTokenId,
}: {
	tokenPriceFeedByTokenId: { [tokenId: string]: TokenPriceEntry[] };
	tokenInfoByTokenId: Record<string, TokenInfo>;
}) => {
	const tokenIds = Object.keys(tokenPriceFeedByTokenId || {});

	const chartData = Object.values(
		Object.entries(tokenPriceFeedByTokenId || {}).reduce(
			(acc, [tokenId, entries]) => {
				entries.forEach((entry) => {
					const date = format(entry.happenAt * 1000, "yyyy-MM-dd HH:MM");

					acc[date] = acc[date] || {
						date,
					};

					acc[date][tokenId] = entry.price || 0;
				});
				return acc;
			},
			{},
		),
	);

	const chartConfig = Object.keys(tokenPriceFeedByTokenId).reduce(
		(acc, tokenId, i) => {
			console.log("tokenId", tokenId, acc);
			acc[tokenId] = {
				label: tokenInfoByTokenId[tokenId]?.symbol,
			};
			return acc;
		},
		{},
	) satisfies ChartConfig;

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
						dataKey="date"
						tickLine={false}
						axisLine={false}
						tickMargin={8}
						minTickGap={32}
						// ticks={filterIntegralTicks([chartData.map(d => d.date)])}
						tickFormatter={(value) => {
							const date = new Date(value);

							return format(date, "HH:MM");
						}}
					/>
					<ChartTooltip
						cursor={false}
						content={<ChartTooltipContent hideLabel />}
					/>
					{tokenIds.map((dataKey, i) => {
						return (
							<Line
								dataKey={dataKey}
								type="natural"
								stroke={`hsl(var(--chart-${i + 1}))`}
								strokeWidth={2}
								dot={false}
							/>
						);
					})}
				</LineChart>
			</ChartContainer>
		</div>
	);
};
