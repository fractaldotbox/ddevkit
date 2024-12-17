import { BY_USER } from "@repo/domain/user.fixture";
import { AttestationCard } from "@repo/ui-react/components/attestations/attestation-card";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Attestations/AttestationCard",
	component: AttestationCard,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof AttestationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Exists: Story = {
	args: {
		attesterAddress: BY_USER.easSampleAttester.address,
	},
};
