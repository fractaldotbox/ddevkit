import { YieldHistoricalChart } from "@geist/ui-react/components/token/yield-historical-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { withQueryClientProvider } from "#stories/decorators/wagmi.tsx";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Token/YieldHistoricalChart",
	component: YieldHistoricalChart,
	parameters: {
		layout: "centered",
	},
	decorators: [withQueryClientProvider()],
} satisfies Meta<typeof YieldHistoricalChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AaveV3UsdcEthereum: Story = {
	args: {
		poolId: "aa70268e-4b52-42bf-a116-608b370f9501",
		title: "USDC (AAVE V3 - Ethereum)",
	},
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 3000);

		const chart = await canvas.findByTestId("yield-historical-chart");
		await expect(chart).toBeInTheDocument();

		const title = await canvas.findByText("USDC (AAVE V3 - Ethereum)");
		await expect(title).toBeInTheDocument();

		await userEvent.keyboard("{Tab}");

		const apyText = await canvas.findByText("APY (%)", undefined, {
			timeout: 3000,
		});
		await expect(apyText).toBeInTheDocument();

		const dateText = await canvas.findByText("Date", undefined, {
			timeout: 3000,
		});
		await expect(dateText).toBeInTheDocument();
	},
};
