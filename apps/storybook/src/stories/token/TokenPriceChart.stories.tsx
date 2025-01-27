import { TokenPriceChart } from "@geist/ui-react/components/token/token-price-chart";
import { BY_CHAIN_ID, Token } from "@geist/ui-react/lib/token/config";
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

// possible to have multiple tokens but trikcy with multiple axis
// https://github.com/recharts/recharts/issues/2815

export const StETH: Story = {
	args: {
		chainId: mainnet.id,
		tokens: [
			{
				chainId: mainnet.id,
				address: BY_CHAIN_ID[mainnet.id][Token.StETH]!,
			},
		],
	},
};
