import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { TransactionCardWithDetails } from "./TransactionCardWithDetails";
import {
	TXN_VITALIK_DEPOSIT,
	TXN_VITALIK_TRANSFER,
} from "@/lib/blockscout/fixture";
import { asTransactionMeta } from "@/lib/blockscout/api";
import { mainnet } from "viem/chains";

const meta = {
	title: "Transactions/TransactionCardWithDetails",
	component: TransactionCardWithDetails,
	args: {},
} satisfies Meta<typeof TransactionCardWithDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VitalikDepositTransaction: Story = {
	args: {
		transaction: asTransactionMeta(TXN_VITALIK_DEPOSIT),
		txnUrl: `https://eth.blockscout.com/tx/${TXN_VITALIK_DEPOSIT.hash}`,
		nativeCurrency: mainnet.nativeCurrency,
	},
	decorators: [withWagmiProvider()],
};

export const VitalikTransferTransaction: Story = {
	args: {
		transaction: asTransactionMeta(TXN_VITALIK_TRANSFER),
		txnUrl: `https://eth.blockscout.com/tx/${TXN_VITALIK_TRANSFER.hash}`,
		nativeCurrency: mainnet.nativeCurrency,
	},
	decorators: [withWagmiProvider()],
};
