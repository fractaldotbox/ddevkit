import { formatNumberWithLocale } from "@geist/domain/amount";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";
import { Skeleton } from "#components/shadcn/skeleton";

type ChainTvlHistoricalChartProps = {
	chainId: string;
	title?: string;
	color?: string;
};

export type DefiLlamaTvlDataPoint = {
	date: number;
	tvl: number;
};

const chartConfig = {} satisfies ChartConfig;

async function getChainTvlHistoricalChartData(
	chainId: string,
): Promise<DefiLlamaTvlDataPoint[]> {
	const response = await fetch(
		`https://api.llama.fi/v2/historicalChainTvl/${chainId}`,
	);

	if (!response.ok) {
		throw new Error(`Failed to fetch TVL data: ${response.statusText}`);
	}

	const data = await response.json();
	return data as DefiLlamaTvlDataPoint[];
}

export function ChainTvlHistoricalChart({
	chainId,
	title,
	color,
}: ChainTvlHistoricalChartProps) {
	const { data, isLoading } = useQuery({
		queryKey: ["chain-tvl-historical-chart", chainId],
		queryFn: () => getChainTvlHistoricalChartData(chainId),
	});

	const formatDate = (timestamp: number) => {
		return new Date(timestamp * 1000).toLocaleDateString();
	};

	const formatTvl = (value: number) => {
		return formatNumberWithLocale({
			value,
			locale: new Intl.Locale("en-US"),
			formatOptions: {
				style: "currency",
				currency: "USD",
				notation: "compact",
				compactDisplay: "short",
			},
		});
	};

	const formattedTvlData = useMemo(() => {
		if (!data) return [];

		const mapTvlDataPoint = (dataPoint: DefiLlamaTvlDataPoint) => ({
			date: dataPoint.date,
			tvl: dataPoint.tvl,
		});

		const sortByDate = (a: DefiLlamaTvlDataPoint, b: DefiLlamaTvlDataPoint) =>
			a.date - b.date;

		return data.map(mapTvlDataPoint).sort(sortByDate);
	}, [data]);

	if (isLoading) return <Skeleton className="h-[400px] w-[600px]" />;

	return (
		<div
			className="flex flex-col gap-2 items-center"
			data-testid="chain-tvl-historical-chart"
		>
			{title && <div className="text-lg font-bold">{title}</div>}
			<ChartContainer
				config={chartConfig}
				// cannot use tailwind here
				style={{ height: "400px", width: "600px" }}
			>
				<LineChart accessibilityLayer data={formattedTvlData}>
					<CartesianGrid strokeDasharray="3 3" horizontal vertical={false} />
					<XAxis
						dataKey="date"
						type="number"
						domain={["dataMin", "dataMax"]}
						tickFormatter={formatDate}
						label={{ value: "Date", position: "insideBottom", offset: -5 }}
					/>
					<YAxis
						tickFormatter={formatTvl}
						label={{ value: "TVL", position: "insideLeft", offset: -5 }}
					/>
					<ChartTooltip
						content={
							<ChartTooltipContent
								formatter={(value, _name, props) => {
									return (
										<div className="text-sm flex flex-col gap-2">
											<div>TVL: {formatTvl(value as number)}</div>
											<div>Date: {formatDate(props.payload.date)}</div>
										</div>
									);
								}}
							/>
						}
					/>
					<Line
						type="monotone"
						dataKey="tvl"
						strokeWidth={2}
						stroke={color ?? "#2563eb"}
						dot={false}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
}
