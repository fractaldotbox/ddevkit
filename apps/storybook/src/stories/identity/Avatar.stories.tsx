import { BY_USER } from "@geist/domain/user.fixture";
import { Avatar } from "@geist/ui-react/components/identity/avatar";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { withQueryClientProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "Identity/Avatar/Avatar",
	component: Avatar,
	args: {},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to test that the avatar is displayed correctly
const testAvatarRendering = async (canvasElement: HTMLElement) => {
	const { canvas } = await setupCanvas(canvasElement, 2000);

	// Check if the avatar is displayed correctly
	const avatar = await canvas.findByRole("img");
	expect(avatar).toBeInTheDocument();
};

export const Ens: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.ens,
	},
	decorators: [withQueryClientProvider()],
	play: async ({ canvasElement }) => {
		await testAvatarRendering(canvasElement);
	},
};

export const Address: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
	play: async ({ canvasElement }) => {
		await testAvatarRendering(canvasElement);
	},
};
