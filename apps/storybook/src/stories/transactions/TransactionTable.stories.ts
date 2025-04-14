import { TransactionTable } from "@geist/ui-react/components/transactions/transaction-table";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Transactions/TransactionTable",
	component: TransactionTable,
	args: {},
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof TransactionTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ContractCreationAndContractCall: Story = {
	args: {
		type: ["contract_creation", "contract_call"],
		chainId: 1,
	},
	decorators: [withWagmiProvider()],
};

export const ContractCreationAndContractCallInOPMainnet: Story = {
	args: {
		type: ["contract_creation", "contract_call"],
		chainId: 10,
	},
	decorators: [withWagmiProvider()],
};
