import type { Meta, StoryObj } from "@storybook/react";
import { TransactionCardWithHash } from "./TransactionCard";
import { withQueryClientProvider } from "../decorators/wagmi";
import { TRANSACTION } from "../fixture";

const meta = {
	title: "Transactions/TransactionCardWithHash",
	component: TransactionCardWithHash,
	args: {},
} satisfies Meta<typeof TransactionCardWithHash>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VitalikDepositTransaction: Story = {
	args: {
		txnHash: TRANSACTION.VITALIK_DEPOSIT.txnHash,
	},
	decorators: [withQueryClientProvider()],
};

export const VitalikTransferTransaction: Story = {
	args: {
		txnHash: TRANSACTION.VITALIK_TRANSFER.txnHash,
	},
	decorators: [withQueryClientProvider()],
};
