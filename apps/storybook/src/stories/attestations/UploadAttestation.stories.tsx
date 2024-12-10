import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { UploadAttestation } from "./UploadAttestation";
import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { getShortAddress } from "@/utils/address";
import { injected, metaMask } from "wagmi/connectors";

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
  render: ({ uid }) => (
    <>
      <ConnectButton />
      <UploadAttestation uid={uid} />
    </>
  ),
};

export const UploadAttestationWithPayload: Story = {
  render: ({ payload }) => (
    <>
      <ConnectButton />
      <UploadAttestation payload={{ attestation: "some_data" }} />
    </>
  ),
};
