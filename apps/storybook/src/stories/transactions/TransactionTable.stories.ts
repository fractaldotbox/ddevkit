import { asTransactionMeta } from "@/lib/blockscout/api";
import { TXN_LIST, generateTxnFixturesByCount } from "@/lib/blockscout/fixture";
import { Explorer } from "@/lib/explorer/url";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { TransactionTable } from "./TransactionTable";

const meta = {
	title: "Transactions/TransactionTable",
	component: TransactionTable,
	args: {},
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
	argTypes: {
		explorer: { options: Object.values(Explorer) },
	},
} satisfies Meta<typeof TransactionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionTableSome: Story = {
	args: {
		transactions: TXN_LIST.map((txn) => asTransactionMeta(txn)),
	},
};

export const TransactionTableMany: Story = {
	args: {
		transactions: generateTxnFixturesByCount(50).map((txn) =>
			asTransactionMeta(txn),
		),
	},
};

export const TransactionTableWithBlockscoutExplorerLink: Story = {
	args: {
		transactions: generateTxnFixturesByCount(50).map((txn) =>
			asTransactionMeta(txn),
		),
		explorer: Explorer.Blockscout,
		chainId: 1,
	},
};

export const TransactionTableWithBlockscoutExplorerLinkInOptimism: Story = {
	args: {
		transactions: generateTxnFixturesByCount(50).map((txn) =>
			asTransactionMeta(txn),
		),
		explorer: Explorer.Blockscout,
		chainId: 10,
	},
};
