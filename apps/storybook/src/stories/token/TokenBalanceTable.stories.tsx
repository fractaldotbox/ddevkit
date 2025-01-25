import {
	asCaip19Id,
	groupMultichainToken,
} from "@geist/domain/token/multi-chain";
import { asTokenBalanceEntries } from "@geist/domain/token/token";
import {
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTIPLE_STABLECOINS,
} from "@geist/domain/token/token-balance.fixture";
import { TokenBalanceTable } from "@geist/ui-react/components/token/token-balance-table";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Token/TokenBalanceTable",
	component: TokenBalanceTable,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenBalanceTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const CrossChain: Story = {
	args: {
		tokenBalances: asTokenBalanceEntries(
			groupMultichainToken(TOKEN_BALANCES_MULTIPLE_STABLECOINS),
			PRICE_DATA_SNAPSHOT,
		),
	},
};
