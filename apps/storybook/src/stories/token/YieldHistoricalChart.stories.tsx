import { YieldHistoricalChart } from "@geist/ui-react/components/token/yield-historical-chart";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Token/YieldHistoricalChart",
	component: YieldHistoricalChart,
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof YieldHistoricalChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultView: Story = {
	args: {
		poolId: "aave-v3-usdc-ethereum",
	},
};
