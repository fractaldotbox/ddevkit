import { BY_PROJECT } from "@geist/domain/project.fixture";
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

export const DdevKitProject: Story = {
	args: {
		projectId: BY_PROJECT.DDEV_KIT.osoProjectId,
	},
	parameters: {},
};
