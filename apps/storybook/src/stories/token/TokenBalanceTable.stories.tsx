import {
	aggregateBySymbol,
	tokenBalanceStore,
} from "@geist/domain/token/aggregate.js";
import {
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTICHAIN_STABLECOINS,
	createTokenBalanceStoreWithFixture,
} from "@geist/domain/token/token-balance.fixture";
import { TokenBalanceTable$ } from "@geist/ui-react/components/token/token-balance-table";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Token/TokenBalanceTable",
	component: TokenBalanceTable$,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenBalanceTable$>;

export default meta;

type Story = StoryObj<typeof meta>;

const { $tokenBalances, $priceData } = createTokenBalanceStoreWithFixture();

export const Multichain: Story = {
	args: {
		$tokenBalances,
		$priceData,
	},
};
