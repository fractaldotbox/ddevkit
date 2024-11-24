import { faker } from "@faker-js/faker";
import type { Meta, StoryObj } from "@storybook/react";
import { Hex } from "viem";
import { withWagmiProvider } from "../decorators/wagmi";
import { BY_USER } from "../fixture";
import { Address } from "./AddressBadge";
import { NameWagmi } from "./NameWagmi";

const meta = {
	title: "Identity/Name/NameWagmi",
	component: NameWagmi,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof NameWagmi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withWagmiProvider()],
};
