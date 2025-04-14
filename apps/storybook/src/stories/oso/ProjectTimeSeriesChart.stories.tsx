import { BY_PROJECT } from "@geist/domain/project.fixture";
import { ProjectTimeSeriesChart } from "@geist/ui-react/components/oso/project-time-series-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { within } from "@testing-library/react";
import type { Address } from "viem";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";
import { setupCanvas } from "#stories/utils/test-utils.ts";

const data = {
	timeseriesMetrics: [
		{
			sampleDate: "2024-05-11",
			metricId: "fedqW3D5QjVidgzZsVSya82sTqGx/RKZbtSN27xL6es=",
			amount: 1,
		},
		{
			sampleDate: "2025-02-19",
			metricId: "fedqW3D5QjVidgzZsVSya82sTqGx/RKZbtSN27xL6es=",
			amount: 1,
		},
	],
	metrics: [
		{
			metricId: "zpin56cpJvc0RDJD3PRq2OnQp04hORyEbj+PAnsQqS0=",
			metricName: "BOB-BORROWED_defillama_tvl_daily",
		},
		{
			metricId: "delPan2gNXB24sQ9Kc6b5nIEbj1AX4huUIHamM31vok=",
			metricName: "LITECOIN_defillama_tvl_daily",
		},
		{
			metricId: "fedqW3D5QjVidgzZsVSya82sTqGx/RKZbtSN27xL6es=",
			metricName: "ETHEREUM_defillama_tvl_daily",
		},
	],
};

const meta = {
	title: "OSO/ProjectTimeSeriesChart",
	component: ProjectTimeSeriesChart,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof ProjectTimeSeriesChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DdevKitProject: Story = {
	args: {
		projectId: BY_PROJECT.DDEV_KIT.osoProjectIdV0,
	},
	parameters: {},
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 3000);
		const chart = await canvas.getByTestId("project-time-series-chart");
		expect(chart).toBeVisible();

		const chartLegendCommits = await canvas.findByText("GITHUB_commits_weekly");
		const chartLegendStars = await canvas.findByText("GITHUB_stars_weekly");
		expect(chartLegendCommits).toBeVisible();
		expect(chartLegendStars).toBeVisible();
	},
};
