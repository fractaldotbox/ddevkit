import { TokenChip } from "@geist/ui-react/components/token/token-chip";
import { BY_CHAIN_ID, Token } from "@geist/ui-react/lib/token/config.js";
import type { Meta, StoryObj } from "@storybook/react";
import { mainnet, optimismSepolia } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";

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
		chainId: mainnet.id,
	},
};

export const OptimismSepoliaTokenChip: Story = {
	args: {
		chainId: optimismSepolia.id,
	},
};

export const ETHTokenChipWithAmount: Story = {
	args: {
		chainId: mainnet.id,
		amount: 300000000000000000n,
	},
};

export const USDCTokenChipWithAmount: Story = {
	args: {
		chainId: mainnet.id,
		address: BY_CHAIN_ID[mainnet.id][Token.USDC],
		amount: 4567000123n,
		decimalsDisplayed: 4,
	},
};
