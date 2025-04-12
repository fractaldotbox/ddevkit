import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@geist/domain/user.fixture";
import { NameAndFollowerCountBadge } from "@geist/ui-react/components/social-graph/name-and-follower-count-badge";
import { expect } from "@storybook/test";
import { withQueryClientProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "SocialGraph/NameAndFollowerCountBadge",
	component: NameAndFollowerCountBadge,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof NameAndFollowerCountBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

async function testEnsAndFollowerCount(canvasElement: HTMLElement, ensText: string) {
	const { canvas } = await setupCanvas(canvasElement, 4000);
	
	const ensTextStr = await canvas.findByText(ensText);
	expect(ensTextStr).toBeInTheDocument();
	
	const followersText = await canvas.findByText(/\d+ followers/);
	expect(followersText).toBeInTheDocument();
}

export const Address: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
	play: async ({ canvasElement }) => {
		await testEnsAndFollowerCount(canvasElement, BY_USER.vitalik.ens);
	},
};
