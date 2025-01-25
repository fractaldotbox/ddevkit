"use client";

import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import {
	formatNumberWithLocale,
	formatUnitsWithLocale,
} from "@geist/domain/amount";
import type { TokenBalanceEntry } from "@geist/domain/token/token-balance-entry";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {} satisfies ChartConfig;

export const asPieChartData = () => {
	const totalAmount = 123n;

	return {
		data: {},
		totalFormatted: formatUnitsWithLocale({
			value: totalAmount,
			formatOptions: {
				style: "currency",
				maximumFractionDigits: 2,
			},
		}),
	};
};

export const TokenBalanceChart = ({
	tokenBalances,
	group = "chain",
	symbol,
	by = "amount",
}: {
	tokenBalances: TokenBalanceEntry[];
	group: string;
	by: "amount" | "value";
}) => {
	console.log("group", group, by);

	const chartData = tokenBalances.map((entry, i) => {
		const { amount, value, chainId } = entry;
		return {
			chainId,
			amount: Number(amount || 0),
			value: Number(value || 0),
			fill: `hsl(var(--chart-${i}))`,
		};
	});

	console.log("chartData", tokenBalances, chartData);
	return (
		<div className="w-full h-full]">
			<ChartContainer
				config={chartConfig}
				style={{ height: "600px", width: "600px" }}
				className="h-[600px] w-full"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								hideLabel
								formatter={(v, key) => {
									console.log("vvv", v);
									return (
										<div>
											{formatUnitsWithLocale({
												value: v,
												exponent: 18,
												formatOptions: {
													style: "currency",
													maximumFractionDigits: 2,
												},
											})}
										</div>
									);
								}}
							/>
						}
					/>
					<Pie
						data={chartData}
						label
						dataKey={by}
						nameKey="chainId"
						innerRadius={60}
						strokeWidth={5}
					>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-3xl font-bold"
											>
												{totalFormatted}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												Balance
											</tspan>
										</text>
									);
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>
		</div>
	);
};
