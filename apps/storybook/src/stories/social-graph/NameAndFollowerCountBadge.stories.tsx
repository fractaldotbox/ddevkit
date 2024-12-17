import type { Meta, StoryObj } from "@storybook/react";

import { withQueryClientProvider } from "../decorators/wagmi";
import { BY_USER } from "../fixture";
import { NameAndFollowerCountBadge } from "@repo/ui-react/components/social-graph/name-and-follower-count-badge";

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

export const Address: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
};
