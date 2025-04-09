import { TokenPriceChart } from "@geist/ui-react/components/token/token-price-chart";
import { BY_CHAIN_ID, Token } from "@geist/ui-react/lib/token/config";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const chart = await canvas.findByTestId(
			"token-price-chart-with-feed",
			undefined,
			{
				timeout: 2000,
			},
		);

		await expect(chart).toBeInTheDocument();
		await userEvent.hover(chart);

		const label = await canvas.findByText("stETH", undefined, {
			timeout: 5000,
		});

		await expect(label).toBeInTheDocument();
	},
};
