import { AttestationCard } from "@repo/ui-react/components/attestations/attestation-card";
import { SCHEMA_BY_NAME } from "@repo/ui-react/lib/eas/attest.fixture";
import type { Meta, StoryObj } from "@storybook/react";
import { mainnet, optimism } from "viem/chains";
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

export const Onchain: Story = {
	args: {
		isOffchain: false,
		chainId: mainnet.id,
		attestationUid:
			SCHEMA_BY_NAME.MET_IRL.byChain[mainnet.id].byExample.onchain,
	},
};

export const OffchainOptimism: Story = {
	args: {
		isOffchain: true,
		chainId: optimism.id,
		attestationUid:
			SCHEMA_BY_NAME.MET_IRL.byChain[optimism.id].byExample.offchain,
	},
};
