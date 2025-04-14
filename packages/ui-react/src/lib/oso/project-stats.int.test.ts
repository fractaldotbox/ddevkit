import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	it,
	test,
} from "vitest";

import { BY_PROJECT } from "@geist/domain/project.fixture";
import { queryCodeMetrics, queryTimeseriesMetrics } from "./project-stats";

describe(
	"project-stats",
	() => {
		test("#queryCodeMetrics", async () => {
			const params = {
				projectId: BY_PROJECT.DDEV_KIT.osoProjectIdV1,
			};
			const result = await queryCodeMetrics(params);
			// console.log("results", result);
		});

		test("#queryTimeseriesMetrics", async () => {
			const params = {
				projectId: BY_PROJECT.DDEV_KIT.osoProjectIdV0,
			};
			const result = await queryTimeseriesMetrics(params);

			expect(result?.timeseriesMetrics?.[0]).toHaveProperty("metricId");
			expect(result?.metrics?.[0]).toHaveProperty("metricId");
			expect(result?.metrics?.[0]).toHaveProperty("metricName");
			// console.log("results", result);
		});
	},
	5 * 60 * 1000,
);
