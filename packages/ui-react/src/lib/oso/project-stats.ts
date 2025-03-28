import type {
	Oso_CodeMetricsByProjectV1,
	Oso_CodeMetricsByProjectV1BoolExp,
	Oso_TimeseriesMetricsByProjectV0,
} from "@geist/graphql/oso/graphql";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";
import { gql, rawRequest } from "graphql-request";

const OSS_GRAPHQL_ENDPOINT = "https://www.opensource.observer/api/v1";

const osoHeaders = {
	Authorization: `Bearer ${process.env.OSS_API_KEY}`,
};

const projectCodeMetricsQuery = gql`
  query CodeMetricsByProject($where: Oso_CodeMetricsByProjectV1BoolExp!) {
	oso_codeMetricsByProjectV1(where: $where) {
		projectId
		projectName
		displayName
		activeDeveloperCount6Months
		closedIssueCount6Months
		commentCount6Months
		commitCount6Months
		contributorCount
		contributorCount6Months
		developerCount
		eventSource
		forkCount
		fulltimeDeveloperAverage6Months
		lastCommitDate
		lastUpdatedAtDate
		mergedPullRequestCount6Months
		newContributorCount6Months
		openedIssueCount6Months
		openedPullRequestCount6Months

		projectNamespace
		projectSource
		releaseCount6Months
		repositoryCount
		starCount
	}
  }
`;

export const queryCodeMetrics = async () => {
	const results = await rawRequest<{
		oso_codeMetricsByProjectV1: Oso_CodeMetricsByProjectV1[];
	}>(
		`${OSS_GRAPHQL_ENDPOINT}/graphql`,
		projectCodeMetricsQuery.toString(),
		{
			where: {
				eventSource: {
					_eq: "GITHUB",
				},
			},
		},
		osoHeaders,
	);

	return results?.data["oso_codeMetricsByProjectV1"];
};

const projectTimeseriesMetricsQuery = gql`
  query TimeseriesMetricsByProject($where: Oso_TimeseriesMetricsByProjectV0BoolExp!) {
	timeseriesMetrics: oso_timeseriesMetricsByProjectV0(where: $where) {
		projectId
		sampleDate
		metricId
 		amount
	}
	metrics: oso_metricsV0 {
		metricId
		metricName
	}
  }
`;

export const queryTimeseriesMetrics = async (params: {
	projectId: string;
}) => {
	const results = await rawRequest<{
		timeseriesMetrics: Oso_TimeseriesMetricsByProjectV0[];
		metrics: any[];
	}>(
		`${OSS_GRAPHQL_ENDPOINT}/graphql`,
		projectTimeseriesMetricsQuery.toString(),
		{
			where: {
				projectId: {
					_eq: params.projectId,
				},
			},
		},
		osoHeaders,
	);

	return results?.data;
};
