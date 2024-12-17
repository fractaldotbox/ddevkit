import { AttestationsTable } from "@repo/ui-react/components/attestations/attestations-table";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { BY_USER, getRandomAddress } from "../fixture";

const meta = {
	title: "Attestations/AttestationsTable",
	component: AttestationsTable,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof AttestationsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Exists: Story = {
	args: {
		address: BY_USER.easSampleAttester.address,
	},
};

export const None: Story = {
	args: {
		address: getRandomAddress(),
	},
};
