import {
	asCaip19Id,
	groupMultichainToken,
} from "@geist/domain/token/multi-chain";
import {
	PRICE_DATA_FEED,
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTICHAIN_STABLECOINS,
	generatePriceDataFeed,
} from "@geist/domain/token/token-balance.fixture";
import { TokenPriceChartWithFeed } from "@geist/ui-react/components/token/token-price-chart-with-feed";
import type { Meta, StoryObj } from "@storybook/react";

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
	},
};
