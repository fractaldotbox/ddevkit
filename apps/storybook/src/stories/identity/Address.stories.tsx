import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { Hex } from "viem";
import { Address } from "./Address";

const meta = {
	title: "Identity/Address",
	component: Address,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof Address>;

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
