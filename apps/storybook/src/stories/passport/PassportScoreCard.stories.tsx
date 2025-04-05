import { BY_USER } from "@geist/domain/user.fixture";
import { PassportScoreCard } from "@geist/ui-react/components/passport/score-card";
import type { Meta, StoryObj } from "@storybook/react";
import type { Address } from "viem";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

const meta = {
	title: "Passport/PassportScoreCard",
	component: PassportScoreCard,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof PassportScoreCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VitalikModel: Story = {
	args: {
		address: BY_USER.vitalik.address,
		passportParams: {
			model: "aggregate",
		},
	},
	parameters: {},
};

export const UserModel: Story = {
	args: {
		address: BY_USER.jesse.address as Address,
		passportParams: {
			model: "aggregate",
		},
	},
};

// need the address to verify stamps look for official examples
export const UserScorer: Story = {
	args: {
		address: BY_USER.vitalik.address,
		passportParams: {
			scorerId: 11347,
		},
	},
};
