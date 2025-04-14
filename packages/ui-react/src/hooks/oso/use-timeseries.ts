import { useQuery } from "@tanstack/react-query";
import { queryTimeseriesMetrics } from "#lib/oso/project-stats";

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
