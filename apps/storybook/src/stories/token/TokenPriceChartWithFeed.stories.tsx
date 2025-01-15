import {
	asCaip19Id,
	groupCrosschainTokens,
} from "@geist/domain/token/cross-chain";
import { asTokenBalanceEntries } from "@geist/domain/token/token";
import {
	PRICE_DATA,
	TOKEN_BALANCES_MULTIPLE_STABLECOINS,
} from "@geist/domain/token/token-balance.fixture";
import { TokenPriceChartWithFeed } from "@geist/ui-react/components/token/token-price-chart-with-feed";
import type { Meta, StoryObj } from "@storybook/react";

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

export const ByCrosschainToken: Story = {
	args: {
		tokenPriceFeed: [],
	},
};

// export const ByChain: Story = {
// 	args: {
// 	},
// };
