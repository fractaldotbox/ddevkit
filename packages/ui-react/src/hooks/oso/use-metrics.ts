import type {
	Oso_CodeMetricsByArtifactV0,
	Oso_CodeMetricsByProjectV1,
} from "@geist/graphql/oso/graphql";
import { useQuery } from "@tanstack/react-query";
import {
	queryCodeMetrics,
	queryTimeseriesMetrics,
} from "#lib/oso/project-stats";

type UseGetProjectCodeMetricsParams = {
	projectId: string;
};

/**
 * Note: v0 metrics are unstable
 * we don't hv a direct id based mapping between key name e.g. `activeDeveloperCount6Months` and the ones at oso_metricsv0
 * For localization sake, we maintain the display name here first
 */
export const NAME_BY_CODE_METRIC_KEY = {
	activeDeveloperCount: "Active Developer Count",
	commitCount: "Commit Count",
	developerCount: "Developer Count",
	lastCommit: "Last Commit Date",
} as Record<string, string>;
export const PERIOD_LABEL_BY_PERIOD = {
	"6Months": "Last 6 Months",
	all: "All period",
	Date: "",
} as Record<string, string>;

// TODO align the daily/weekly convnetion at project metric
export const parseMetric = (key: string) => {
	let labelKey = key;

	const m = key.match(/(.*)(6Months|Date)/);

	const isDate = m?.[2] === "Date";

	return {
		label: NAME_BY_CODE_METRIC_KEY[m?.[1] || key] || labelKey,
		period: PERIOD_LABEL_BY_PERIOD[m?.[2]!] ?? PERIOD_LABEL_BY_PERIOD.all,
		type: isDate ? "date" : "number",
	};
};

export const useGetProjectCodeMetrics = ({
	projectId,
}: UseGetProjectCodeMetricsParams) => {
	const queryOptions = {
		queryKey: ["oso-project-metric", projectId],
		queryFn: async () => {
			return queryCodeMetrics({ projectId });
		},
		select: (data: Oso_CodeMetricsByProjectV1) => {
			console.log("data", data);

			return data;
		},
	};

	return useQuery(queryOptions);
};
