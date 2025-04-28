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
import { formatNumberWithLocale } from "@geist/domain/amount";

type ProtocolTvlHistoricalChartProps = {
	protocol: string;
	title?: string;
	color?: string;
};

interface ProtocolTvlDataPoint {
	date: number;
	totalLiquidityUSD: number;
}

interface ChainTvlData {
	[chainId: string]: ProtocolTvlDataPoint[];
}

interface ProtocolData {
	chainTvls: ChainTvlData;
	tvl: ProtocolTvlDataPoint[];
	[key: string]: unknown;
}

const chartConfig = {} satisfies ChartConfig;

async function getProtocolTvlHistoricalChartData(
	protocolId: string,
): Promise<ProtocolTvlDataPoint[]> {
	const response = await fetch(`https://api.llama.fi/protocol/${protocolId}`);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch protocol TVL data: ${response.statusText}`,
		);
	}

	const data = (await response.json()) as ProtocolData;

	// If chainName is specified, only include data for that chain
	if (data.tvl) {
		const chainData = data.tvl;
		const validPoints = chainData.filter(
			(point) =>
				typeof point === "object" &&
				"date" in point &&
				"totalLiquidityUSD" in point,
		);
		return validPoints.sort((a, b) => a.date - b.date);
	}

	// Otherwise combine all valid chain data into a single dataset
	const tvlData: ProtocolTvlDataPoint[] = [];

	Object.values(data.chainTvls).forEach((chainData) => {
		// Only include data where the required format is present
		if (Array.isArray(chainData) && chainData.length > 0) {
			const validPoints = chainData.filter(
				(point) =>
					typeof point === "object" &&
					"date" in point &&
					"totalLiquidityUSD" in point,
			);
			tvlData.push(...validPoints);
		}
	});

	// Sort by date
	return tvlData.sort((a, b) => a.date - b.date);
}

export function ProtocolTvlHistoricalChart({
	protocol: protocolId,
	title,
	color,
}: ProtocolTvlHistoricalChartProps) {
	const { data, isLoading } = useQuery({
		queryKey: ["protocol-tvl-historical-chart", protocolId],
		queryFn: () => getProtocolTvlHistoricalChartData(protocolId),
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

		return data.map((dataPoint) => ({
			date: dataPoint.date,
			tvl: dataPoint.totalLiquidityUSD,
		}));
	}, [data]);

	const displayTitle = useMemo(() => {
		if (title) return title;
		return protocolId;
	}, [title, protocolId]);

	if (isLoading) return <Skeleton className="h-[400px] w-[600px]" />;

	return (
		<div
			className="flex flex-col gap-2 items-center"
			data-testid="protocol-tvl-historical-chart"
		>
			{displayTitle && <div className="text-lg font-bold">{displayTitle}</div>}
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
						dataKey="tvl"
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
