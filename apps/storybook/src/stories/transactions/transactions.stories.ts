import type { Meta, StoryObj } from "@storybook/react";
import { TransactionCard } from "./TransactionCard";
import {
	withQueryClientProvider,
	withWagmiProvider,
} from "../decorators/wagmi";
import { BY_USER } from "../fixture";

const meta = {
	title: "Transactions/Transaction",
	component: Avatar,
	args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ens: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.ens,
	},
	decorators: [withQueryClientProvider()],
};

export const Address: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
};
