import {
	aggregateBySymbol,
	tokenBalanceStore,
} from "@geist/domain/token/aggregate.js";
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

const { $tokenBalances, $priceData } = tokenBalanceStore();

$tokenBalances.set([...TOKEN_BALANCES_MULTIPLE_STABLECOINS]);

$priceData.set([...PRICE_DATA_SNAPSHOT]);

const $aggregate = aggregateBySymbol($tokenBalances, $priceData);

// map to chart data

// TODO   Container component with nanostore useStore deps
const mapAggregateAsBalances = () => {
	const aggregate = $aggregate.get();
	// const balances = asTokenBalanceEntries(tokenBalances);
	// const grouped = groupMultichainToken(balances);
	// return grouped;
};

export const CrossChain: Story = {
	args: {
		tokenBalances: [],
		// aggregate: $aggregate.get()
	},
};
