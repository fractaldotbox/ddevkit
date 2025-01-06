import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@geist/domain/user.fixture";

import { NFTCard } from "@geist/ui-react/components/NFT/NFT-Card";
import { BY_CHAIN_ID, Token } from "@geist/ui-react/lib/token/config";
import { Address } from "viem";
import { base, optimism } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";

const meta = {
	title: "NFT/NFTCard",
	component: NFTCard,
	parameters: {
		layout: "centered",
	},
	argTypes: {},
	args: {},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof NFTCard>;

export default meta;
type Story = StoryObj<typeof meta>;



export const PUDGYPENGUIN: Story = {
	args: {
		contractAddress: BY_USER.vitalik.address as Address,
        tokenId: 1
	},
};