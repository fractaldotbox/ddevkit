import { TransactionCardWithDetails } from "@geist/ui-react/components/transactions/transaction-card-with-details";
import { asTransactionMeta } from "@geist/ui-react/lib/blockscout/api";
import { BY_TXN } from "@geist/ui-react/lib/blockscout/data.fixture";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { mainnet } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Transactions/TransactionCardWithDetails",
	component: TransactionCardWithDetails,
	args: {},
} satisfies Meta<typeof TransactionCardWithDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

const testTransactionCardWithDetails = async (
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

	const transactionId = await canvas.findByText(transactionIdText);
	await expect(transactionId).toBeInTheDocument();

	const token = await canvas.findByText(tokenText);
	await expect(token).toBeInTheDocument();

	const fromAddress = await canvas.findByText(fromAddressText);
	await expect(fromAddress).toBeInTheDocument();

	const toAddress = await canvas.findByText(toAddressText);
	await expect(toAddress).toBeInTheDocument();
};

export const VitalikDepositTransaction: Story = {
	args: {
		transaction: asTransactionMeta(BY_TXN.VITALIK_DEPOSIT),
		txnUrl: `https://eth.blockscout.com/tx/${BY_TXN.VITALIK_DEPOSIT.hash}`,
		nativeCurrency: mainnet.nativeCurrency,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement }) => {
		await testTransactionCardWithDetails(
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
		transaction: asTransactionMeta(BY_TXN.VITALIK_TRANSFER),
		txnUrl: `https://eth.blockscout.com/tx/${BY_TXN.VITALIK_TRANSFER.hash}`,
		nativeCurrency: mainnet.nativeCurrency,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement }) => {
		await testTransactionCardWithDetails(
			canvasElement,
			"0xed46...9b67",
			"ETH",
			"0xd8dA...6045",
			"0x52a7...bF6c",
		);
	},
};
