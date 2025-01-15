import { TokenPriceChart } from "@geist/ui-react/components/token/token-price-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { mainnet } from "viem/chains";

const meta = {
	title: "Token/TokenPriceChart",
	component: TokenPriceChart,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenPriceChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ethereum: Story = {
	args: {
		chain: mainnet,
		tokenAddress: "0xdF574c24545E5FfEcb9a659c229253D4111d87e1",
	},
};
