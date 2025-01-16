import { TokenPriceChart } from "@geist/ui-react/components/token/token-price-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { mainnet } from "viem/chains";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

const meta = {
	title: "Token/TokenPriceChart",
	component: TokenPriceChart,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof TokenPriceChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ethereum: Story = {
	args: {
		chain: mainnet,
		tokenIds:
			"eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f,eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
	},
};
