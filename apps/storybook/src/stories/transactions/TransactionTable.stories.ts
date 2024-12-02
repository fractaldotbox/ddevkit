import { asTransactionMeta } from "@/lib/blockscout/api";
import { TXN_LIST, generateTxnFixturesByCount } from "@/lib/blockscout/fixture";
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
} satisfies Meta<typeof TransactionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionTableWithoutFetching: Story = {
	args: {
		transactions: TXN_LIST.map((txn) => asTransactionMeta(txn)),
	},
};

export const TransactionTableWithoutFetching2: Story = {
	args: {
		transactions: generateTxnFixturesByCount(50).map((txn) =>
			asTransactionMeta(txn),
		),
	},
};

export const TransactionTableWithBlockscoutAPI: Story = {
	args: {
		transactions: generateTxnFixturesByCount(50).map((txn) =>
			asTransactionMeta(txn),
		),
	},
};
