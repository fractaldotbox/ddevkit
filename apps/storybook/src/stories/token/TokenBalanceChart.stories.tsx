import { tokenBalanceStore } from "@geist/domain/token/aggregate";
import {
	PRICE_DATA_SNAPSHOT,
	TOKEN_BALANCES_MULTICHAIN_STABLECOINS,
	createTokenBalanceStoreWithFixture,
} from "@geist/domain/token/token-balance.fixture";
import { TokenBalanceChart$ } from "@geist/ui-react/components/token/token-balance-chart";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent } from "@storybook/test";
import { setupCanvas } from "../utils/test-utils";

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

async function testTokenBalanceChart(canvasElement: HTMLElement) {
	const { canvas } = await setupCanvas(canvasElement, 4000);

	const chart = await canvas.findByTestId("token-balance-chart");
	expect(chart).toBeInTheDocument();

	const balanceText = await canvas.findByText("Balance");
	expect(balanceText).toBeInTheDocument();
}

export const TokenAmountByMultichain: Story = {
	args: {
		group: "token",
		dataKey: "amount",
		$tokenBalances: $tokenBalancesStablecoin,
		$priceData,
	},
	play: async ({ canvasElement }) => {
		await testTokenBalanceChart(canvasElement);
	},
};

export const TokenValueByMultichain: Story = {
	args: {
		group: "token",
		dataKey: "value",
		$tokenBalances,
		$priceData,
	},
	play: async ({ canvasElement }) => {
		await testTokenBalanceChart(canvasElement);
	},
};
