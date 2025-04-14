import { generatePriceDataFeed } from "@geist/domain/token/token-balance.fixture";
import { TokenPriceChartWithFeed } from "@geist/ui-react/components/token/token-price-chart-with-feed";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { setupCanvas } from "../utils/test-utils";

const tokenInfoByTokenId = {
	"eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f": {
		symbol: "DAI",
	},
	"eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48": {
		imageUrl: "",
		symbol: "USDC",
	},
};

const meta = {
	title: "Token/TokenPriceChartWithFeed",
	component: TokenPriceChartWithFeed,
	parameters: {
		layout: "centered",
	},

	args: {},
	decorators: [],
} satisfies Meta<typeof TokenPriceChartWithFeed>;

export default meta;

type Story = StoryObj<typeof meta>;

const now = new Date();

export const ByCrosschainToken: Story = {
	args: {
		tokenPriceFeedByTokenId: {
			"eip155:1/erc20:0x6b175474e89094c44da98b954eedeac495271d0f":
				generatePriceDataFeed(10, now),
			"eip155:1/erc20:0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48":
				generatePriceDataFeed(10, now),
		},
		tokenInfoByTokenId,
		locale: "en-US",
	},
	play: async ({ canvasElement }) => {
		const { canvas } = await setupCanvas(canvasElement, 3000);

		const chart = await canvas.findByTestId("token-price-chart-with-feed");
		await expect(chart).toBeInTheDocument();

		await userEvent.keyboard("{Tab}");

		const daiLabel = await canvas.findByText("DAI", undefined, {
			timeout: 3000,
		});
		await expect(daiLabel).toBeInTheDocument();

		const usdcLabel = await canvas.findByText("USDC", undefined, {
			timeout: 3000,
		});
		await expect(usdcLabel).toBeInTheDocument();
	},
};
