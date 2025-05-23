import { format, parse } from "date-fns";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#components/shadcn/card";
import { Skeleton } from "#components/shadcn/skeleton";
import { parseMetric, useGetProjectCodeMetrics } from "#hooks/oso/use-metrics";

// TODO parse and format date
export const ProjectMetricsCardWithData = ({
	metric,
	type,
	label,
	period,
}: {
	metric: string;
	type?: string;
	label: string;
	period?: string;
}) => {
	return (
		<Card className="w-[300px]">
			<CardHeader className="relative">
				<CardDescription className="font-bold text-md">{label}</CardDescription>
				<CardTitle className="@[250px]/card:text-6xl text-5xl font-semibold tabular-nums">
					{metric ?? <Skeleton className="h-4 w-[100px]" />}
				</CardTitle>
				{/* <div className="absolute right-4 top-4">
					<Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
						<TrendingUpIcon className="size-3" />
						+12.5%
					</Badge>
				</div> */}
			</CardHeader>
			<CardFooter>
				<div className="font-light text-muted-foreground">{period}</div>
			</CardFooter>
		</Card>
	);
};

export const ProjectMetricsGrid = ({
	projectId,
}: {
	projectId: string;
}) => {
	const { data } = useGetProjectCodeMetrics({ projectId });

	return (
		<div className="flex flex-row gap-2">
			<ProjectMetricsCardWithData
				metric={data?.activeDeveloperCount6Months}
				{...parseMetric("activeDeveloperCount6Months")}
			/>
			<ProjectMetricsCardWithData
				metric={data?.commitCount6Months}
				{...parseMetric("commitCount6Months")}
			/>
			<ProjectMetricsCardWithData
				metric={data?.developerCount}
				{...parseMetric("developerCount")}
			/>
			<ProjectMetricsCardWithData
				metric={data?.lastCommitDate}
				{...parseMetric("lastCommitDate")}
			/>
		</div>
	);
};
