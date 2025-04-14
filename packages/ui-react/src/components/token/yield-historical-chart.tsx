import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";
import { Skeleton } from "#components/shadcn/skeleton";

type YieldHistoricalChartProps = {
	// this will be defillama pool id
	poolId: string;
	title?: string;
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

const chartConfig = {} satisfies ChartConfig;

async function getYieldHistoricalChartData(
	poolId: string,
): Promise<DefiLlamaYieldDataPoint[]> {
	const response = await fetch(`https://yields.llama.fi/chart/${poolId}`);

	if (!response.ok) {
		throw new Error(`Failed to fetch yield data: ${response.statusText}`);
	}

	const data = await response.json();
	return data.data as DefiLlamaYieldDataPoint[];
}

export function YieldHistoricalChart({
	poolId,
	title,
	color,
}: YieldHistoricalChartProps) {
	const { data, isLoading } = useQuery({
		queryKey: ["yield-historical-chart", poolId],
		queryFn: () => getYieldHistoricalChartData(poolId),
	});

	const formatDate = (timestamp: number) => {
		return new Date(timestamp).toLocaleDateString();
	};

	const formattedYieldData = useMemo(() => {
		if (!data) return [];

		return data
			.map((dataPoint) => ({
				date: new Date(dataPoint.timestamp).getTime(),
				apy: dataPoint.apy,
			}))
			.sort((a, b) => a.date - b.date);
	}, [data]);

	if (isLoading) return <Skeleton className="h-[400px] w-[600px]" />;

	return (
		<div
			className="flex flex-col gap-2 items-center"
			data-testid="yield-historical-chart"
		>
			{title && <div className="text-lg font-bold">{title}</div>}
			<ChartContainer
				config={chartConfig}
				// cannot use tailwind here
				style={{ height: "400px", width: "600px" }}
			>
				<LineChart accessibilityLayer data={formattedYieldData}>
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
								formatter={(value, _name, props) => {
									return (
										<div className="text-sm flex flex-col gap-2">
											<div>APY: {(value as number).toFixed(2)}%</div>
											<div>Date: {formatDate(props.payload.date)}</div>
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
		</div>
	);
}
