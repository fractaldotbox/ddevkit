import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import {
	ChartContainer,
	type ChartConfig,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from "#components/shadcn/chart";
import { useMemo } from "react";
import { Label } from "#components/shadcn/label";
import * as React from "react";
import { TokenChipWithInfo } from "./token-chip-with-info";

type YieldHistoricalChartProps = {
	// this will be defillama pool id
	poolId: string;
	color?: string;
};

export type DefiLlamaYieldDataPoint = {
	timestamp: string;
	tvlUsd: number;
	apy: number;
	apyBase: number;
	apyReward: number | null;
	il7d: number | null;
	apyBase7d: number | null;
};

// Mock historical yield data following DefiLlamaYieldDataPoint type
const MOCK_YIELD_DATA: DefiLlamaYieldDataPoint[] = [
	{
		timestamp: "2024-03-01",
		tvlUsd: 1000000,
		apy: 3.5,
		apyBase: 3.2,
		apyReward: 0.3,
		il7d: -0.1,
		apyBase7d: 3.3,
	},
	{
		timestamp: "2024-03-02",
		tvlUsd: 1100000,
		apy: 3.8,
		apyBase: 3.5,
		apyReward: 0.3,
		il7d: -0.12,
		apyBase7d: 3.6,
	},
	{
		timestamp: "2024-03-03",
		tvlUsd: 1150000,
		apy: 4.1,
		apyBase: 3.7,
		apyReward: 0.4,
		il7d: -0.08,
		apyBase7d: 3.8,
	},
	{
		timestamp: "2024-03-04",
		tvlUsd: 1200000,
		apy: 4.3,
		apyBase: 3.8,
		apyReward: 0.5,
		il7d: -0.05,
		apyBase7d: 3.9,
	},
	{
		timestamp: "2024-03-05",
		tvlUsd: 1180000,
		apy: 4.0,
		apyBase: 3.6,
		apyReward: 0.4,
		il7d: -0.07,
		apyBase7d: 3.7,
	},
	{
		timestamp: "2024-03-06",
		tvlUsd: 1250000,
		apy: 4.5,
		apyBase: 4.0,
		apyReward: 0.5,
		il7d: -0.04,
		apyBase7d: 4.1,
	},
	{
		timestamp: "2024-03-07",
		tvlUsd: 1300000,
		apy: 4.7,
		apyBase: 4.1,
		apyReward: 0.6,
		il7d: -0.03,
		apyBase7d: 4.2,
	},
	{
		timestamp: "2024-03-08",
		tvlUsd: 1280000,
		apy: 4.6,
		apyBase: 4.0,
		apyReward: 0.6,
		il7d: -0.04,
		apyBase7d: 4.1,
	},
	{
		timestamp: "2024-03-09",
		tvlUsd: 1320000,
		apy: 4.8,
		apyBase: 4.2,
		apyReward: 0.6,
		il7d: -0.03,
		apyBase7d: 4.3,
	},
	{
		timestamp: "2024-03-10",
		tvlUsd: 1350000,
		apy: 5.0,
		apyBase: 4.3,
		apyReward: 0.7,
		il7d: -0.02,
		apyBase7d: 4.4,
	},
	{
		timestamp: "2024-03-11",
		tvlUsd: 1340000,
		apy: 4.9,
		apyBase: 4.2,
		apyReward: 0.7,
		il7d: -0.03,
		apyBase7d: 4.3,
	},
	{
		timestamp: "2024-03-12",
		tvlUsd: 1360000,
		apy: 5.1,
		apyBase: 4.4,
		apyReward: 0.7,
		il7d: -0.02,
		apyBase7d: 4.5,
	},
	{
		timestamp: "2024-03-13",
		tvlUsd: 1400000,
		apy: 5.3,
		apyBase: 4.5,
		apyReward: 0.8,
		il7d: -0.01,
		apyBase7d: 4.6,
	},
	{
		timestamp: "2024-03-14",
		tvlUsd: 1380000,
		apy: 5.2,
		apyBase: 4.4,
		apyReward: 0.8,
		il7d: -0.02,
		apyBase7d: 4.5,
	},
	{
		timestamp: "2024-03-15",
		tvlUsd: 1420000,
		apy: 5.4,
		apyBase: 4.6,
		apyReward: 0.8,
		il7d: -0.01,
		apyBase7d: 4.7,
	},
	{
		timestamp: "2024-03-16",
		tvlUsd: 1450000,
		apy: 5.5,
		apyBase: 4.7,
		apyReward: 0.8,
		il7d: -0.01,
		apyBase7d: 4.8,
	},
	{
		timestamp: "2024-03-17",
		tvlUsd: 1480000,
		apy: 5.6,
		apyBase: 4.8,
		apyReward: 0.8,
		il7d: -0.01,
		apyBase7d: 4.9,
	},
];

const chartConfig = {} satisfies ChartConfig;

export function YieldHistoricalChart({
	poolId,
	color,
}: YieldHistoricalChartProps) {
	const data = MOCK_YIELD_DATA;

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString();
	};

	const formatAPY = (value: number) => `${value.toFixed(2)}%`;

	const formattedYieldData = useMemo(() => {
		return data
			.map((dataPoint) => ({
				date: new Date(dataPoint.timestamp).getTime(),
				apy: dataPoint.apy,
			}))
			.sort((a, b) => a.date - b.date);
	}, [data]);

	return (
		<ChartContainer
			config={chartConfig}
			// cannot use tailwind here
			style={{ height: "400px", width: "600px" }}
		>
			<LineChart data={formattedYieldData}>
				<CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
				<XAxis
					dataKey="date"
					type="number"
					domain={["dataMin", "dataMax"]}
					tickFormatter={formatDate}
					label={{ value: "Date", position: "insideBottom", offset: -5 }}
				/>
				<YAxis
					label={{ value: "APY (%)", position: "insideLeft", offset: -5 }}
				/>
				<ChartTooltip
					content={
						<ChartTooltipContent
							formatter={(value, name, props) => {
								const date = new Date(props.payload.date).toLocaleDateString();
								return (
									<div className="text-sm flex flex-col gap-2">
										<div>APY: {(value as number).toFixed(2)}%</div>
										<div>Date: {date}</div>
									</div>
								);
							}}
						/>
					}
				/>
				<Line
					type="monotone"
					dataKey="apy"
					strokeWidth={2}
					stroke={color ?? "#2563eb"}
					dot={false}
				/>
			</LineChart>
		</ChartContainer>
	);
}
