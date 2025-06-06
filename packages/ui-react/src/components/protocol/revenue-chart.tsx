import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { formatNumberWithLocale } from "@geist/domain/amount";
import { format } from "date-fns";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";
import { useGetProtocolRevenue } from "#hooks/data/use-defillama";

const chartConfig = {
	fees: {
		label: "fees",
		color: "hsl(var(--chart-1))",
	},
	revenue: {
		label: "revenue",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export const RevenueChart = ({
	protocolSlug,
}: {
	protocolSlug: string;
}) => {
	const [activeCharts, setActiveCharts] = React.useState<
		(keyof typeof chartConfig)[]
	>(["fees", "revenue"]);

	const { data: dailyFees } = useGetProtocolRevenue(protocolSlug, "dailyFees");
	const { data: dailyRevenue } = useGetProtocolRevenue(
		protocolSlug,
		"dailyRevenue",
	);

	const chartData = (dailyFees?.totalDataChart || []).map(
		([happenAt, amount], i) => {
			const date = format(happenAt * 1000, "yyyy-MM-dd HH:MM");

			const [, revenue] = dailyRevenue?.totalDataChart[i] || [];

			return {
				date,
				fees: amount,
				revenue,
			};
		},
	);

	return (
		<div className="w-full h-full" data-testid="revenue-chart">
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

					{activeCharts.map((activeChart) => (
						<>
							<ChartTooltip
								key={activeChart}
								content={
									<ChartTooltipContent
										className="w-[150px]"
										nameKey={activeChart}
										labelFormatter={(date) => {
											return new Date(date).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
												year: "numeric",
											});
										}}
										formatter={(value, key) => {
											return (
												`${key}` +
												formatNumberWithLocale({
													value: value as number,
													formatOptions: {
														style: "currency",
													},
												})
											);
										}}
									/>
								}
							/>
							<Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
						</>
					))}
				</BarChart>
			</ChartContainer>
		</div>
	);
};
