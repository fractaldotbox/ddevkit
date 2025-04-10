import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@geist/domain/user.fixture";
import { AvatarWagmi } from "@geist/ui-react/components/identity/avatar-wagmi";
import { expect, within } from "@storybook/test";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Identity/Avatar/AvatarWagmi",
	component: AvatarWagmi,
	args: {},
} satisfies Meta<typeof AvatarWagmi>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnsWagmi: Story = {
	args: {
		ens: BY_USER.vitalik.ens,
	},
	decorators: [withWagmiProvider()],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Simulate a delay to allow the avatar to load
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Check if the avatar is displayed correctly
		const avatar = await canvas.findByRole("img");
		expect(avatar).toBeInTheDocument();
	},
};
