import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { TransactionTableWithDetails } from "./TransactionTableWithDetails";

const meta = {
  title: "Transactions/TransactionTableWithDetails",
  component: TransactionTableWithDetails,
  args: {},
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TransactionTableWithDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TransactionTableWithDetailsContractCreationAndContractCall: Story =
  {
    args: {
      type: ["contract_creation", "contract_call"],
      chainId: 1,
    },
    decorators: [withWagmiProvider()],
  };

export const TransactionTableWithDetailsContractCreationAndContractCallInOPMainnet: Story =
  {
    args: {
      type: ["contract_creation", "contract_call"],
      chainId: 10,
    },
    decorators: [withWagmiProvider()],
  };
