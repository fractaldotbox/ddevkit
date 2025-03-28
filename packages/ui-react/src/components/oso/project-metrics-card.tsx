import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#components/shadcn/card";
import {
	queryCodeMetrics,
	queryTimeseriesMetrics,
} from "#lib/oso/project-stats";

interface TimeSeriesChartProps {
	title: string;
	description?: string;
	data: Array<{
		sampleDate: string;
		amount: number;
	}>;
}

export const ProjectMetricsCardWithData = ({
	metric,
	metricTitle,
}: {
	metric: string;
	metricTitle: string;
}) => {
	return (
		<Card className="@container/card">
			<CardHeader className="relative">
				<CardDescription>{metricTitle}</CardDescription>
				<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
					{metric}
				</CardTitle>
				{/* <div className="absolute right-4 top-4">
					<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
						<TrendingUpIcon className="size-3" />
						+12.5%
					</Badge>
				</div> */}
			</CardHeader>
		</Card>
	);
};

type UseGetProjectCodeMetricsParams = {
	projectId: string;
};

export const useGetProjectCodeMetrics = ({
	projectId,
}: UseGetProjectCodeMetricsParams) => {
	const queryOptions = {
		queryKey: ["oso-project-metric", projectId],
		queryFn: async () => {
			return queryCodeMetrics({ projectId });
		},
	};
	return useQuery(queryOptions);
};

export const ProjectMetricsCard = ({
	projectId,
}: {
	projectId: string;
}) => {
	const { data } = useGetProjectCodeMetrics({ projectId });
	console.log("data", data);
	return (
		<ProjectMetricsCardWithData
			metric={data?.activeDeveloperCount6Months}
			metricTitle="Active Developers Count last 6 months"
		/>
	);
};
