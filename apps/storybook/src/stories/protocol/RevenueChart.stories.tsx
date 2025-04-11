import { RevenueChart } from "@geist/ui-react/components/protocol/revenue-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";
import { setupCanvas } from "#stories/utils/test-utils.ts";

const meta = {
	title: "Protocol/RevenueChart",
	component: RevenueChart,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof RevenueChart>;

export default meta;

type Story = StoryObj<typeof meta>;

// Case of multiple tokens->axis is tricky
// https://github.com/recharts/recharts/issues/2815

export const AaveV3: Story = {
	args: {
		protocolSlug: "aave-v3",
	},
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement);
		const chart = await canvas.findByTestId("revenue-chart");
		expect(chart).toBeInTheDocument();
	},
};
