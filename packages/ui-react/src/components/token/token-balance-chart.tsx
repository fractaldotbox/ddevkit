"use client";

import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import { formatUnitsWithLocale } from "@geist/domain/amount";
import { Label, Pie, PieChart } from "recharts";
import type { TokenBalanceEntry } from "./token-balance-entry";

const chartConfig = {} satisfies ChartConfig;

export const TokenBalanceChart = ({
	tokenBalances,
}: {
	tokenBalances: TokenBalanceEntry[];
}) => {
	const totalAmount = React.useMemo(() => {
		return tokenBalances.reduce((acc, curr) => acc + curr.value! || 0n, 0n);
	}, []);

	const chartData = tokenBalances.map((entry, i) => {
		return {
			amount: Number(entry.amount || 0),
			value: Number(entry.value || 0),
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
									return (
										<div>
											{formatUnitsWithLocale({
												value: BigInt(v),
												exponent: 0,
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
						dataKey="amount"
						nameKey="browser"
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
												{formatUnitsWithLocale({
													value: totalAmount,
													exponent: 18,
													formatOptions: {
														style: "currency",
														maximumFractionDigits: 2,
													},
												})}
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
