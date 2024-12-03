import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { UploadAttestation } from "./UploadAttestation";

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

export const UploadAttestationWithId: Story = {
  args: {
    uid: "0x0",
  },
};

export const UploadAttestationWithPayload: Story = {
  args: {
    payload: { attestation: "some_data" },
  },
};
