import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "#components/shadcn/card";
import { parseMetric, useGetProjectCodeMetrics } from "#hooks/oso/use-metrics";
import {
	ProjectMetricsCardWithData,
	ProjectMetricsGrid,
} from "./project-metrics-grid";
import { ProjectTimeSeriesChart } from "./project-time-series-chart";

interface ProjectCardProps {
	projectIdV0: string;
	projectIdV1: string;
	title?: string;
}

export const ProjectCard = ({ projectIdV0, projectIdV1 }: ProjectCardProps) => {
	const { data } = useGetProjectCodeMetrics({ projectId: projectIdV1 });

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>{data?.displayName}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Code Metrics</h3>
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
				</div>
				<div className="space-y-4">
					<h3 className="text-lg font-semibold">Github Metrics Trend</h3>
					<ProjectTimeSeriesChart
						projectId={projectIdV0}
						metricNameWhiteList={[
							"GITHUB_stars_weekly",
							"GITHUB_commits_weekly",
						]}
					/>
				</div>
			</CardContent>
		</Card>
	);
};
