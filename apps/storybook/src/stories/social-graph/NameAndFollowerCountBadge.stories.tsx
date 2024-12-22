import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@repo/domain/user.fixture";
import { NameAndFollowerCountBadge } from "@repo/ui-react/components/social-graph/name-and-follower-count-badge";
import { withQueryClientProvider } from "../decorators/wagmi";

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
