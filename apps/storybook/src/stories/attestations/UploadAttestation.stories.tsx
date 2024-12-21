import { Button } from "#components/ui/button";
import { UploadAttestation } from "@repo/ui-react/components/attestations/upload-attestation";
import { getShortAddress } from "@repo/ui-react/lib/utils/address";
import type { Meta, StoryObj } from "@storybook/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { withToaster } from "../decorators/toaster";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Attestations/UploadAttestation",
	component: UploadAttestation,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof UploadAttestation>;

export default meta;
type Story = StoryObj<typeof meta>;

function ConnectButton() {
	const { connect } = useConnect();
	const { disconnect } = useDisconnect();
	const { address, isConnected } = useAccount();

	if (isConnected && address)
		return (
			<Button variant="outline" onClick={() => disconnect()}>
				{getShortAddress(address)}
			</Button>
		);

	return (
		<Button
			variant="outline"
			onClick={() => connect({ connector: injected() })}
		>
			Connect Wallet
		</Button>
	);
}

export const UploadAttestationWithId: Story = {
	args: {
		uid: "0xbd8ffc232319335da170af2f0d92d50db48224cb3ca643a41ce672ecaa26226a",
		chainId: 11155111,
	},
	render: ({ uid, chainId }) => (
		<>
			<ConnectButton />
			<UploadAttestation uid={uid} chainId={chainId} />
		</>
	),
	decorators: [withToaster()],
};

export const UploadAttestationWithPayload: Story = {
	args: {
		payload: { attestation: "some_data_from_your_attestation" },
		chainId: 11155111,
	},
	render: ({ payload, chainId }) => (
		<>
			<ConnectButton />
			<UploadAttestation payload={payload} chainId={chainId} />
		</>
	),
	decorators: [withToaster()],
};
