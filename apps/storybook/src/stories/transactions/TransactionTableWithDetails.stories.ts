import { TransactionTableWithDetails } from "@geist/ui-react/components/transactions/transaction-table-with-details";
import { asTransactionMeta } from "@geist/ui-react/lib/blockscout/api";
import {
	TXN_LIST,
	generateTxnFixturesByCount,
} from "@geist/ui-react/lib/blockscout/data.fixture";
import { Explorer } from "@geist/ui-react/lib/explorer/url";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { withWagmiProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Transactions/TransactionTableWithDetails",
	component: TransactionTableWithDetails,
	args: {},
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
	argTypes: {
		explorer: { options: Object.values(Explorer) },
	},
} satisfies Meta<typeof TransactionTableWithDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const testTable = async (canvasElement: HTMLElement) => {
	const { canvas } = await setupCanvas(canvasElement, 3000);

	const table = await canvas.findByRole("table");
	await expect(table).toBeInTheDocument();

	const headers = await canvas.findAllByRole("columnheader");
	expect(headers.length).toBe(7);
	expect(headers[0]).toHaveTextContent("Txn Hash");
	expect(headers[1]).toHaveTextContent("From");
	expect(headers[2]).toHaveTextContent("To");
	expect(headers[3]).toHaveTextContent("Txn Type");
	expect(headers[4]).toHaveTextContent("Value (ETH)");
	expect(headers[5]).toHaveTextContent("Gas Used (ETH)");
	expect(headers[6]).toHaveTextContent("Block Number");

	const rows = await canvas.findAllByRole("row");
	expect(rows.length).toBeGreaterThan(1); // Includes header row
};

export const TransactionTableSome: Story = {
	args: {
		transactions: TXN_LIST.map((txn) => asTransactionMeta(txn)),
	},
	play: async ({ canvasElement }) => {
		await testTable(canvasElement);
	},
};

export const TransactionTableMany: Story = {
	args: {
		transactions: generateTxnFixturesByCount(50).map((txn) =>
			asTransactionMeta(txn),
		),
	},
	play: async ({ canvasElement }) => {
		await testTable(canvasElement);
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
	play: async ({ canvasElement }) => {
		await testTable(canvasElement);
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
	play: async ({ canvasElement }) => {
		await testTable(canvasElement);
	},
};
