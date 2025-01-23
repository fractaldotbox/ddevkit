import { RevenueChart } from "@geist/ui-react/components/protocol/revenue-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

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

// possible to have multiple tokens but trikcy with multiple axis
// https://github.com/recharts/recharts/issues/2815

export const AaveV3: Story = {
	args: {
		protocolSlug: "aave-v3",
	},
};
