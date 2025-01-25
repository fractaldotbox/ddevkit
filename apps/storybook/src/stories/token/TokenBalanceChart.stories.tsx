import {
	asCaip19Id,
	groupMultichainToken,
} from "@geist/domain/token/multi-chain";
import { asTokenBalanceEntries } from "@geist/domain/token/token";
import {
	PRICE_DATA_SNAPSHOT,
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

// separate abstraction
// similar to how Elasticsearch query handles aggs https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations.html
// agg by chain, token

// useful:
// e.g. USDC amount distribution by each chain
// e.g. value distribution of agg of multiple tokens by each chain
// e.g. value distribution by each token of a chain

// not useful
// e.g. multiple non-stable token amount by each chain

export const TokenAmountByMultichain: Story = {
	args: {
		group: "chain",
		// dataByGroup: {}

		tokenBalances: asTokenBalanceEntries(
			groupMultichainToken(TOKEN_BALANCES_MULTIPLE_STABLECOINS),
			PRICE_DATA_SNAPSHOT,
		),
	},
};

// export const TokenValueByMultichain: Story = {
// 	args: {
// 		...TokenAmountByMultichain.args,
// 		group: 'chain',
// 	},
// };
