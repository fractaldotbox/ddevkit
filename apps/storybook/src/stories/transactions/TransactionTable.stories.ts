import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { TransactionTable } from "@repo/ui-react/components/transactions/transaction-table";
import {
	generateTxnFixturesByCount,
	TXN_LIST,
} from "@repo/ui-react/lib/blockscout/data.fixture";
import { asTransactionMeta } from "@repo/ui-react/lib/blockscout/api";
import { Explorer } from "@repo/ui-react/lib/explorer/url";

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
