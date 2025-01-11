"use client";

import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import { Label, Pie, PieChart } from "recharts";
import type { TokenBalanceEntry } from "./token-balance-entry";

const chartData = [
	{ browser: "chrome", visitors: 275, fill: "hsl(var(--chart-1))" },
	{ browser: "safari", visitors: 200, fill: "hsl(var(--chart-2))" },
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
} satisfies ChartConfig;

export const TokenBalanceChart = ({
	tokenBalances,
}: {
	tokenBalances: TokenBalanceEntry[];
}) => {
	const totalAmount = React.useMemo(() => {
		return tokenBalances.reduce((acc, curr) => acc + curr.value! || 0, 0);
	}, []);

	const chartData = tokenBalances.map((entry, i) => {
		return {
			browser: entry.symbol,
			visitors: entry.value || 0,
			fill: `hsl(var(--chart-${i}))`,
		};
	});

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
						content={<ChartTooltipContent hideLabel />}
					/>
					<Pie
						data={chartData}
						label
						dataKey="visitors"
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
												${totalAmount.toLocaleString()}
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
