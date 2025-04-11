import { TRANSACTION } from "@geist/domain/user.fixture";
import { TransactionCard } from "@geist/ui-react/components/transactions/transaction-card";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { mainnet } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Transactions/TransactionCard",
	component: TransactionCard,
	args: {},
	play: async ({ canvasElement }) => {
		// console.log("canvasElement", canvasElement);
		// const canvas = within(canvasElement);
		// const cardTitle = await canvas.findByText("Transaction", undefined, {
		// 	timeout: 2000,
		// });
		// await expect(cardTitle).toBeInTheDocument();
	},
} satisfies Meta<typeof TransactionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VitalikDepositTransaction: Story = {
	args: {
		txnHash: TRANSACTION.VITALIK_DEPOSIT.txnHash,
		chain: mainnet,
	},
	decorators: [withWagmiProvider()],
};

export const VitalikTransferTransaction: Story = {
	args: {
		txnHash: TRANSACTION.VITALIK_TRANSFER.txnHash,
		chain: mainnet,
	},
	decorators: [withWagmiProvider()],
};
