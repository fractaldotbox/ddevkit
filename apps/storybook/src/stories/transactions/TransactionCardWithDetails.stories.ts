import { TransactionCardWithDetails } from "@geist/ui-react/components/transactions/transaction-card-with-details";
import { asTransactionMeta } from "@geist/ui-react/lib/blockscout/api";
import { BY_TXN } from "@geist/ui-react/lib/blockscout/data.fixture";
import type { Meta, StoryObj } from "@storybook/react";
import { mainnet } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Transactions/TransactionCardWithDetails",
	component: TransactionCardWithDetails,
	args: {},
} satisfies Meta<typeof TransactionCardWithDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VitalikDepositTransaction: Story = {
	args: {
		transaction: asTransactionMeta(BY_TXN.VITALIK_DEPOSIT),
		txnUrl: `https://eth.blockscout.com/tx/${BY_TXN.VITALIK_DEPOSIT.hash}`,
		nativeCurrency: mainnet.nativeCurrency,
	},
	decorators: [withWagmiProvider()],
};

export const VitalikTransferTransaction: Story = {
	args: {
		transaction: asTransactionMeta(BY_TXN.VITALIK_TRANSFER),
		txnUrl: `https://eth.blockscout.com/tx/${BY_TXN.VITALIK_TRANSFER.hash}`,
		nativeCurrency: mainnet.nativeCurrency,
	},
	decorators: [withWagmiProvider()],
};
