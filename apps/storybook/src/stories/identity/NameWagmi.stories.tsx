import { BY_USER } from "@geist/domain/user.fixture";
import { NameWagmi } from "@geist/ui-react/components/identity/name-wagmi";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";

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
