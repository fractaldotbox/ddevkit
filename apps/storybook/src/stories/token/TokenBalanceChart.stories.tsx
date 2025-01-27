import { tokenBalanceStore } from "@geist/domain/token/aggregate";
import {
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTICHAIN_STABLECOINS,
	createTokenBalanceStoreWithFixture,
} from "@geist/domain/token/token-balance.fixture";
import { TokenBalanceChart$ } from "@geist/ui-react/components/token/token-balance-chart";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
	title: "Token/TokenBalanceChart$",
	component: TokenBalanceChart$,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenBalanceChart$>;

export default meta;

type Story = StoryObj<typeof meta>;

// separate abstraction
// similar to how Elasticsearch query handles aggs https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html
// agg by chain, token

// useful:
// e.g. USDC amount distribution by each chain
// e.g. value distribution of agg of multiple tokens by each chain
// e.g. value distribution by each token of a chain

// not useful
// e.g. multiple non-stable token amount by each chain

const { $tokenBalances, $priceData } = createTokenBalanceStoreWithFixture();
const { $tokenBalances: $tokenBalancesStablecoin } =
	createTokenBalanceStoreWithFixture();

$tokenBalancesStablecoin.set(TOKEN_BALANCES_MULTICHAIN_STABLECOINS);

export const TokenAmountByMultichain: Story = {
	args: {
		group: "token",
		dataKey: "amount",
		$tokenBalances: $tokenBalancesStablecoin,
		$priceData,
	},
};

export const TokenValueByMultichain: Story = {
	args: {
		group: "token",
		dataKey: "value",
		$tokenBalances,
		$priceData,
	},
};
