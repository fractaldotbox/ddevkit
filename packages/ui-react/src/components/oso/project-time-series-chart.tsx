import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#components/shadcn/card";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { queryTimeseriesMetrics } from "#lib/oso/project-stats";

interface TimeSeriesChartProps {
	title: string;
	description?: string;
	data: Array<{
		sampleDate: string;
		amount: number;
	}>;
}

export const ProjectTimeSeriesChartWithData = ({ data }: { data: any }) => {
	const formattedData = data.map((item) => ({
		date: item.sampleDate,
		value: item.amount,
		formattedDate: format(parseISO(item.sampleDate), "MMM dd, yyyy"),
	}));

	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				data={formattedData}
				margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
			>
				<CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
				<XAxis
					dataKey="formattedDate"
					className="text-xs text-muted-foreground"
				/>
				<YAxis className="text-xs text-muted-foreground" />
				<Tooltip
					contentStyle={{
						backgroundColor: "hsl(var(--card))",
						borderColor: "hsl(var(--border))",
					}}
					labelStyle={{ color: "hsl(var(--foreground))" }}
				/>
				<Line
					type="monotone"
					dataKey="value"
					stroke="hsl(var(--primary))"
					activeDot={{ r: 8 }}
					strokeWidth={2}
				/>
			</LineChart>
		</ResponsiveContainer>
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
			await queryTimeseriesMetrics({ projectId });
		},
	};
	return useQuery(queryOptions);
};

export const ProjectTimeSeriesChart = ({ projectId }: TimeSeriesChartProps) => {
	const data = {};

	// useGetProjectTimeSeries()
	return <ProjectTimeSeriesChartWithData data={data} />;
};
