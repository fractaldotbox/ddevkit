import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@repo/domain/user.fixture";
import { Balance } from "@repo/ui-react/components/account/balance";
import { BY_CHAIN_ID, Token } from "@repo/ui-react/lib/utils/config";
import { Address } from "viem";
import { base, optimism } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "Account/Balance",
	component: Balance,
	parameters: {
		layout: "centered",
	},
	argTypes: {},
	args: {},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainnetETH: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
	},
};

export const BaseETH: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		chainId: base.id,
	},
};

export const OptimismUSDC: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		chainId: optimism.id,
		token: BY_CHAIN_ID[optimism.id][Token.USDC],
	},
};
