import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { Hex } from "viem";
import { AddressBadge } from "@repo/ui-react/components/identity/address-badge";

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
