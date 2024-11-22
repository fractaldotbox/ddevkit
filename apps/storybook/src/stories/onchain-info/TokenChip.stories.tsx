import { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "../decorators/wagmi";
import { TokenChip } from "./TokenChip";
import { mainnet } from "viem/chains";

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

export const ETHTokenChip: Story = {
	args: {
		chain: mainnet,
		amount: 300000000000000000n,
	}
};

export const USDCTokenChip: Story = {
	args: {
		chain: mainnet,
		address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
		amount: 456000000000000000n,
	}
};
