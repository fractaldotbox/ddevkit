import { faker } from "@faker-js/faker";
import { AddressBadge } from "@geist/ui-react/components/identity/address-badge";
import type { Meta, StoryObj } from "@storybook/react";
import { Hex } from "viem";

const meta = {
	title: "Identity/AddressBadge",
	component: AddressBadge,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof AddressBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
	args: {
		address: faker.finance.ethereumAddress() as Hex,
	},
};

export const Full: Story = {
	args: {
		address: faker.finance.ethereumAddress() as Hex,
		isFull: true,
	},
};
