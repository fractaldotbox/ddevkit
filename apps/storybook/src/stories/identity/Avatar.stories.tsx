import { BY_USER } from "@geist/domain/user.fixture";
import { Avatar } from "@geist/ui-react/components/identity/avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";
import { withQueryClientProvider } from "../decorators/wagmi";

const meta = {
	title: "Identity/Avatar/Avatar",
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
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Simulate a delay to allow the avatar to load
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Check if the avatar is displayed correctly
		const avatar = await canvas.findByRole("img");
		expect(avatar).toBeInTheDocument();
	},
};

export const Address: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Simulate a delay to allow the avatar to load
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Check if the avatar is displayed correctly
		const avatar = await canvas.findByRole("img");
		expect(avatar).toBeInTheDocument();
	},
};
