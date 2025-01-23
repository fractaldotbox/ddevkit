"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { format } from "date-fns";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#components/shadcn/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";
import { useGetProtocolRevenue } from "#hooks/data/use-defillama.js";

const chartConfig = {
	fees: {
		label: "fees",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export const RevenueChart = ({
	protocolSlug,
}: {
	protocolSlug: string;
}) => {
	const [activeChart, setActiveChart] =
		React.useState<keyof typeof chartConfig>("fees");

	const { data } = useGetProtocolRevenue(protocolSlug);
	const { totalDataChart = [] } = data || {};

	const chartData = totalDataChart.map(([happenAt, amount]) => {
		const date = format(happenAt * 1000, "yyyy-MM-dd HH:MM");

		return {
			date,
			fees: amount,
		};
	});

	console.log("chartData", chartData);

	const total = React.useMemo(
		() => ({
			desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
			mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
		}),
		[],
	);

	return (
		<ChartContainer
			config={chartConfig}
			style={{ height: "600px", width: "600px" }}
			className="aspect-auto h-[250px] w-full"
		>
			<BarChart
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
					tickFormatter={(value) => {
						const date = new Date(value);
						return date.toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
						});
					}}
				/>
				<ChartTooltip
					content={
						<ChartTooltipContent
							className="w-[150px]"
							nameKey="fees"
							labelFormatter={(date) => {
								return new Date(date).toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
									year: "numeric",
								});
							}}
							formatter={(value) => {
								return `${value.toLocaleString({
									style: "currency",
									currency: "USD",
								})}`;
							}}
						/>
					}
				/>
				<Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
			</BarChart>
		</ChartContainer>
	);
};
