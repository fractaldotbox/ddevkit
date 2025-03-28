import { Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { format, parse, parseISO } from "date-fns";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";
import { queryTimeseriesMetrics } from "#lib/oso/project-stats";

interface ProjectTimeSeriesChartProps {
	projectId: string;
	metricNameWhiteList: string[];
}
const chartConfig = {} satisfies ChartConfig;
// Mock data for multi
export const ProjectTimeSeriesChartWithData = ({
	points,
	metricsById,
}: {
	points: any[];
	metricsById: Record<
		string,
		{
			metricName: string;
		}
	>;
}) => {
	const metricIds = Object.keys(metricsById);

	const groupedPoints = useMemo(() => {
		const grouped = points.reduce((acc, point) => {
			const dateGroup = format(point.sampleDate, "yyyy-'W'II");
			if (!acc[dateGroup]) {
				acc[dateGroup] = {};
			}
			acc[dateGroup].dateGroup = point.dateGroup;
			acc[dateGroup][point.metricId] = point.amount;
			// use last point to avoid re-parse
			acc[dateGroup].sampleDate = point.sampleDate;
			return acc;
		}, {});

		return Object.entries(grouped).map(([dateGroup, data]) => data);
	}, [points]);

	return (
		<ChartContainer
			config={chartConfig}
			style={{ height: "400px", width: "600px" }}
		>
			<LineChart
				data={groupedPoints}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
				<XAxis
					dataKey="sampleDate"
					tickLine={false}
					axisLine={false}
					className="text-xs text-muted-foreground"
					tickFormatter={(value) => {
						return format(value, "yyyy-MM");
					}}
				/>
				<YAxis className="text-xs text-muted-foreground" />
				<ChartTooltip cursor={true} content={<ChartTooltipContent />} />
				{metricIds.map((metricId, index) => (
					<Line
						key={metricId}
						type="monotone"
						dataKey={metricId}
						name={metricsById[metricId]?.metricName}
						stroke={`hsl(var(--chart-${index + 1}))`}
						activeDot={{ r: 8 }}
						strokeWidth={2}
					/>
				))}
			</LineChart>
		</ChartContainer>
	);
};

type UseGetProjectTimeSeriesParams = {
	projectId: string;
};

export const useGetProjectTimeSeries = ({
	projectId,
}: UseGetProjectTimeSeriesParams) => {
	const queryOptions = {
		queryKey: ["oso-project-timeseries", projectId],
		queryFn: async () => {
			return queryTimeseriesMetrics({ projectId });
		},
	};
	return useQuery(queryOptions);
};

// Metrics need to align smae time period e.g. weekly
export const ProjectTimeSeriesChart = ({
	projectId,
	metricNameWhiteList = ["GITHUB_stars_weekly", "GITHUB_commits_weekly"],
}: ProjectTimeSeriesChartProps) => {
	const { data, isLoading, error } = useGetProjectTimeSeries({
		projectId,
	});

	const { points, metricsById } = useMemo(() => {
		if (!data?.metrics) {
			return {
				points: [],
				metricsById: {},
			};
		}
		const metricsById = Object.fromEntries(
			metricNameWhiteList.map((metricNameWhiteListed) => {
				const metric = data.metrics.find(({ metricName }) => {
					return metricName === metricNameWhiteListed;
				});

				return [metric.metricId, metric];
			}),
		);

		const points = data.timeseriesMetrics
			.filter((point) => {
				return metricsById[point.metricId];
			})
			.map((point) => {
				return {
					...point,
					...metricsById[point.metricId],
					sampleDate: new Date(point.sampleDate).getTime(),
				};
			})
			.sort((a, b) => a.sampleDate - b.sampleDate);

		return {
			points,
			metricsById,
		};
	}, [data, isLoading]);

	if (!points) {
		return <Skeleton className="w-full bg-gray-200" />;
	}

	return (
		<ProjectTimeSeriesChartWithData points={points} metricsById={metricsById} />
	);
};
