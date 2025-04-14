import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@geist/domain/user.fixture";
import { Balance } from "@geist/ui-react/components/account/balance";
import { BY_CHAIN_ID, Token } from "@geist/ui-react/lib/token/config";
import { expect } from "@storybook/test";
import type { Address } from "viem";
import { base, mainnet, optimism } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

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

async function testBalanceDisplay(
	canvasElement: HTMLElement,
	tokenRegex: RegExp,
) {
	const { canvas } = await setupCanvas(canvasElement, 4000);

	const balanceText = await canvas.findByText(tokenRegex);
	expect(balanceText).toBeInTheDocument();
}

export const MainnetETH: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
	},
	play: async ({ canvasElement }) => {
		await testBalanceDisplay(canvasElement, /ETH/);
	},
};

export const BaseETH: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		chainId: base.id,
	},
	play: async ({ canvasElement }) => {
		await testBalanceDisplay(canvasElement, /ETH/);
	},
};

export const MainnetUSDC: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		tokenAddress: BY_CHAIN_ID[mainnet.id][Token.USDC] as Address,
		chainId: mainnet.id,
	},
	play: async ({ canvasElement }) => {
		await testBalanceDisplay(canvasElement, /USDC/);
	},
};

export const OptimismUSDC: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		tokenAddress: BY_CHAIN_ID[optimism.id][Token.USDC] as Address,
		chainId: optimism.id,
	},
	play: async ({ canvasElement }) => {
		await testBalanceDisplay(canvasElement, /USDC/);
	},
};
