import { ChainTvlHistoricalChart } from "@geist/ui-react/components/defi/chain-tvl-historical-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { withQueryClientProvider } from "#stories/decorators/wagmi.tsx";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "DeFi/ChainTvlHistoricalChart",
	component: ChainTvlHistoricalChart,
	parameters: {
		layout: "centered",
	},
	decorators: [withQueryClientProvider()],
} satisfies Meta<typeof ChainTvlHistoricalChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EthereumMainnet: Story = {
	args: {
		chainId: "ethereum",
		title: "Ethereum TVL",
		color: "#5470FF",
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 3000);

		const chart = await canvas.findByTestId("chain-tvl-historical-chart");
		await expect(chart).toBeInTheDocument();

		const title = await canvas.findByText("Ethereum TVL");
		await expect(title).toBeInTheDocument();

		await userEvent.keyboard("{Tab}");

		const tvlText = await canvas.findByText("TVL", undefined, {
			timeout: 3000,
		});
		await expect(tvlText).toBeInTheDocument();

		const dateText = await canvas.findByText("Date", undefined, {
			timeout: 3000,
		});
		await expect(dateText).toBeInTheDocument();
	},
};

export const ArbitrumOne: Story = {
	args: {
		chainId: "arbitrum",
		title: "Arbitrum TVL",
		color: "#28A0F0",
	},
};
