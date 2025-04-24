import { ProtocolTvlHistoricalChart } from "@geist/ui-react/components/defi/protocol-tvl-historical-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { withQueryClientProvider } from "#stories/decorators/wagmi.tsx";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "DeFi/ProtocolTvlHistoricalChart",
	component: ProtocolTvlHistoricalChart,
	parameters: {
		layout: "centered",
	},
	decorators: [withQueryClientProvider()],
} satisfies Meta<typeof ProtocolTvlHistoricalChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AaveProtocol: Story = {
	args: {
		protocol: "aave",
		title: "Aave v2 TVL",
		color: "#B6509E",
	},
	play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 3000);

		const chart = await canvas.findByTestId("protocol-tvl-historical-chart");
		await expect(chart).toBeInTheDocument();

		const title = await canvas.findByText("Aave v2 TVL");
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

export const UniswapProtocol: Story = {
	args: {
		protocol: "uniswap",
		title: "Uniswap v3 TVL",
		color: "#FF007A",
	},
};

export const MorphoProtocol: Story = {
	args: {
		protocol: "morpho",
		title: "Morpho TVL",
		color: "#00D395",
	},
};
