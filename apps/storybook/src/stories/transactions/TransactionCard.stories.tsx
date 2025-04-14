import { TRANSACTION } from "@geist/domain/user.fixture";
import { TransactionCard } from "@geist/ui-react/components/transactions/transaction-card";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { mainnet } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Transactions/TransactionCard",
	component: TransactionCard,
	args: {},
} satisfies Meta<typeof TransactionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const testTransactionCard = async (
	canvasElement: HTMLElement,
	transactionIdText: string,
	tokenText: string,
	fromAddressText: string,
	toAddressText: string,
) => {
	const { canvas } = await setupCanvas(canvasElement, 3000);

	const cardTitle = await canvas.findByText("Transaction");
	await expect(cardTitle).toBeInTheDocument();

	const transferText = await canvas.findByText("Transfer");
	await expect(transferText).toBeInTheDocument();

	const addressLinks = await canvas.findAllByRole("link");
	await expect(addressLinks.length).toBeGreaterThan(0);

	const ethText = await canvas.findByText(tokenText);
	await expect(ethText).toBeInTheDocument();

	const transactionId = await canvas.findByText(transactionIdText);
	await expect(transactionId).toBeInTheDocument();

	const fromAddress = await canvas.findByText(fromAddressText);
	await expect(fromAddress).toBeInTheDocument();

	const toAddress = await canvas.findByText(toAddressText);
	await expect(toAddress).toBeInTheDocument();
};

export const VitalikDepositTransaction: Story = {
	args: {
		txnHash: TRANSACTION.VITALIK_DEPOSIT.txnHash,
		chain: mainnet,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement, args }) => {
		await testTransactionCard(
			canvasElement,
			"0x3163...0a3b",
			"WETH",
			"0xd8dA...6045",
			"0xB4A8...dBC2",
		);
	},
};

export const VitalikTransferTransaction: Story = {
	args: {
		txnHash: TRANSACTION.VITALIK_TRANSFER.txnHash,
		chain: mainnet,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement }) => {
		await testTransactionCard(
			canvasElement,
			"0xed46...9b67",
			"ETH",
			"0xd8dA...6045",
			"0x52a7...bF6c",
		);
	},
};
