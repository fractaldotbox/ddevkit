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

const tokenInfoByTokenId = {
	"eip155:1/erc20:0xae7ab96520de3a18e5e111b5eaab095312d7fe84": {
		symbol: "StETH",
	},
	"eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
		symbol: "USDC",
	},
};

export const Ethereum: Story = {
	args: {
		chain: mainnet,
		tokenInfoByTokenId,
		tokens: [
			{
				chainId: mainnet.id,
				address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
			},
			{
				chainId: mainnet.id,
				address: "0xae7ab96520de3a18e5e111b5eaab095312d7fe84",
			},
		],
	},
};
