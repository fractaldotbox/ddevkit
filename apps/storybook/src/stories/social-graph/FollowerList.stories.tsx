import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@geist/domain/user.fixture";
import { FollowerListEnsjs } from "@geist/ui-react/components/social-graph/follower-list-ensjs";
import { expect, within } from "@storybook/test";
import { withQueryClientProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "SocialGraph/FollowerListEnsjs",
	component: FollowerListEnsjs,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof FollowerListEnsjs>;

export default meta;
type Story = StoryObj<typeof meta>;

async function testFollowerListDisplay(
	canvasElement: HTMLElement,
	address: string,
) {
	const { canvas } = await setupCanvas(canvasElement, 4000);

	const addressText = await canvas.findByText(address);
	expect(addressText).toBeInTheDocument();

	const followersArea = await canvas.findByText(/followers/i);
	expect(followersArea).toBeInTheDocument();

	await new Promise((resolve) => setTimeout(resolve, 2000));
	const followerList = await canvas.findAllByText(/.eth/i);
	expect(followerList.length).toBeGreaterThan(0);
}

export const Ensjs: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
	play: async ({ canvasElement }) => {
		await testFollowerListDisplay(canvasElement, BY_USER.vitalik.address);
	},
};
