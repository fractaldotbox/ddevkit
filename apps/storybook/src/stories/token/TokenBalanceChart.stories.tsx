import {
	asCaip19Id,
	groupCrosschainTokens,
} from "@geist/domain/token/cross-chain";
import { asTokenBalanceEntries } from "@geist/domain/token/token";
import {
	PRICE_DATA,
	TOKEN_BALANCES_MULTIPLE_STABLECOINS,
} from "@geist/domain/token/token-balance.fixture";
import { TokenBalanceChart } from "@geist/ui-react/components/token/token-balance-chart";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Token/TokenBalanceChart",
	component: TokenBalanceChart,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenBalanceChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ByCrosschainToken: Story = {
	args: {
		tokenBalances: asTokenBalanceEntries(
			groupCrosschainTokens(TOKEN_BALANCES_MULTIPLE_STABLECOINS),
			PRICE_DATA,
		),
	},
};

// export const ByChain: Story = {
// 	args: {
// 	},
// };
