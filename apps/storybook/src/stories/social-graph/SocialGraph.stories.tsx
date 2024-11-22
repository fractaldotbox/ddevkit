import type { Meta, StoryObj } from "@storybook/react";

import { withQueryClientProvider } from "../decorators/wagmi";
import { BY_USER } from "../fixture";
import { SocialGraph } from "./SocialGraph";

const meta = {
	title: "SocialGraph/SocialGraph",
	component: SocialGraph,
	parameters: {
		layout: "centered",
	},
	args: {},
} satisfies Meta<typeof SocialGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Graph: Story = {
	args: {
		addressOrEns: BY_USER.vitalik.address,
	},
	decorators: [withQueryClientProvider()],
};
