import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { BlockscoutTransactionTable } from "./BlockscoutTransactionTable";

const meta = {
  title: "Transactions/BlockscoutTransactionTable",
  component: BlockscoutTransactionTable,
  args: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BlockscoutTransactionTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TransactionTableWithBlockscoutAPIContractCreationAndContractCall: Story =
  {
    args: {
      type: ["contract_creation", "contract_call"],
      chainId: 1,
    },
    decorators: [withWagmiProvider()],
  };

export const TransactionTableWithBlockscoutAPIContractCreationAndContractCallInOPMainnet: Story =
  {
    args: {
      type: ["contract_creation", "contract_call"],
      chainId: 10,
    },
    decorators: [withWagmiProvider()],
  };
