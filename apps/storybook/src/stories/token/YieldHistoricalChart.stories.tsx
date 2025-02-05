import { withQueryClientProvider } from "#stories/decorators/wagmi.tsx";
import { YieldHistoricalChart } from "@geist/ui-react/components/token/yield-historical-chart";
import type { Meta, StoryObj } from "@storybook/react";

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
		// this is aave v3 usdc on ethereum
		poolId: "aa70268e-4b52-42bf-a116-608b370f9501",
	},
};
