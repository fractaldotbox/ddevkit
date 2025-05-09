import { TransactionTable } from "@geist/ui-react/components/transactions/transaction-table";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { withWagmiProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Transactions/TransactionTable",
	component: TransactionTable,
	args: {},
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof TransactionTable>;

export default meta;

type Story = StoryObj<typeof meta>;

const testTransactionTable = async (canvasElement: HTMLElement) => {
	const { canvas } = await setupCanvas(canvasElement, 7000);

	const headers = canvas.getAllByRole("columnheader");
	expect(headers).toHaveLength(7);
	expect(headers[0]).toHaveTextContent("Txn Hash");
	expect(headers[1]).toHaveTextContent("From");
	expect(headers[2]).toHaveTextContent("To");
	expect(headers[3]).toHaveTextContent("Txn Type");
	expect(headers[4]).toHaveTextContent("Value (ETH)");
	expect(headers[5]).toHaveTextContent("Gas Used (ETH)");
	expect(headers[6]).toHaveTextContent("Block Number");

	const rows = canvas.getAllByRole("row");
	expect(rows.length).toBeGreaterThan(1);

	const firstDataRow = rows[1];
	const cells = within(firstDataRow).getAllByRole("cell");
	expect(cells).toHaveLength(7);
	expect(cells[0]).toBeInTheDocument();
	expect(cells[1]).toBeInTheDocument();
	expect(cells[2]).toBeInTheDocument();
	expect(cells[3]).toBeInTheDocument();
};

export const ContractCreationAndContractCall: Story = {
	args: {
		type: ["contract_creation", "contract_call"],
		chainId: 1,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement }) => {
		await testTransactionTable(canvasElement);
	},
};

export const ContractCreationAndContractCallInOPMainnet: Story = {
	args: {
		type: ["contract_creation", "contract_call"],
		chainId: 10,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement }) => {
		await testTransactionTable(canvasElement);
	},
};
