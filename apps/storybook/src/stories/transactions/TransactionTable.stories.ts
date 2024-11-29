import { asTransactionMeta } from "@/lib/blockscout/api";
import { TXN_LIST } from "@/lib/blockscout/fixture";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { TransactionTable } from "./TransactionTable";

const meta = {
  title: "Transactions/TransactionTable",
  component: TransactionTable,
  args: {},
} satisfies Meta<typeof TransactionTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TransactionTableWithoutFetching: Story = {
  args: {
    transactions: TXN_LIST.map((txn) => asTransactionMeta(txn)),
  },
  decorators: [withWagmiProvider()],
};
