import type { Meta, StoryObj } from "@storybook/react";

import { FollowerListEnsjs } from "@repo/ui-react/components/social-graph/follower-list-ensjs";
import { withQueryClientProvider } from "../decorators/wagmi";
import { BY_USER } from "../fixture";

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

export const Ensjs: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
};
