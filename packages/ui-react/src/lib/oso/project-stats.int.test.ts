import {
	describe,
	it,
	expect,
	beforeAll,
	afterAll,
	afterEach,
	test,
} from "vitest";
import { queryCodeMetrics, queryTimeseriesMetrics } from "./project-stats";

const PROJECT_ID = "DjRsDzYdMseT34+iydaLO7PHX1dfywIAExlAeW0YlHM=";
describe(
	"project-stats",
	() => {
		test("#queryCodeMetrics", async () => {
			const result = await queryCodeMetrics();
			console.log("results", result);
		});

		test.only("#queryTimeseriesMetrics", async () => {
			const params = {
				projectId: PROJECT_ID,
			};
			const result = await queryTimeseriesMetrics(params);

			expect(result?.timeseriesMetrics?.[0]).toHaveProperty("metricId");
			expect(result?.metrics?.[0]).toHaveProperty("metricId");
			expect(result?.metrics?.[0]).toHaveProperty("metricName");
			console.log("results", result);
		});
	},
	5 * 60 * 1000,
);
