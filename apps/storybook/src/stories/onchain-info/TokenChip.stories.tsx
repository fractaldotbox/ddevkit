import { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { TokenChip } from "./TokenChip";

const meta = {
  title: "OnchainInfo/TokenChip",
  component: TokenChip,
  parameters: {
    layout: "centered",
  },
  args: {},
  decorators: [withWagmiProvider()],
} satisfies Meta<typeof TokenChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ETH: Story = {
  args: {
    image:
      "https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Feth-diamond-black.a042df77.png&w=828&q=75",
    name: "Ether",
    symbol: "ETH",
  },
};
