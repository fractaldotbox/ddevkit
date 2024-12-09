import type { Meta, StoryObj } from "@storybook/react";
import { mainnet } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";
import { TRANSACTION } from "../fixture";
import { TransactionCard } from "./TransactionCard";

const meta = {
  title: "Transactions/TransactionCard",
  component: TransactionCard,
  args: {},
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
