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
import { queryTimeseriesMetrics } from "#lib/oso/project-stats";

interface TimeSeriesChartProps {
	title: string;
	description?: string;
	data: Array<{
		sampleDate: string;
		amount: number;
	}>;
}

export const ProjectMetricsCard = ({
	metric,
}: {
	metric: string;
}) => {
	return (
		<Card className="@container/card">
			<CardHeader className="relative">
				<CardDescription>Total Revenue</CardDescription>
				<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
					$1,250.00
					{metric}
				</CardTitle>
				{/* <div className="absolute right-4 top-4">
					<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
						<TrendingUpIcon className="size-3" />
						+12.5%
					</Badge>
				</div> */}
			</CardHeader>
			<CardFooter className="flex-col items-start gap-1 text-sm">
				<div className="line-clamp-1 flex gap-2 font-medium">
					Trending up this month <TrendingUpIcon className="size-4" />
				</div>
				<div className="text-muted-foreground">
					Visitors for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
};
