import type { Meta, StoryObj } from "@storybook/react";

import { BY_USER } from "@geist/domain/user.fixture";
import { Balance } from "@geist/ui-react/components/account/balance";
import { BY_CHAIN_ID, Token } from "@geist/ui-react/lib/token/config";
import type { Address } from "viem";
import { base, mainnet, optimism } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";
import { expect, userEvent, within } from "@storybook/test";

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
	play: async ({ canvasElement }) => {
	  const canvas = within(canvasElement);

	  // Check if the loading text is displayed initially
	  const loadingText = await canvas.findByText("Loading...");
	  expect(loadingText).toBeInTheDocument();

	  // Simulate a delay to allow the balance to load (mocked in Storybook)
	  await new Promise((resolve) => setTimeout(resolve, 1000));

	  // Check if the balance is displayed correctly
	  const balanceText = await canvas.findByText(/ETH/); // Adjust regex based on expected balance format
	  expect(balanceText).toBeInTheDocument();
	},
};

export const BaseETH: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		chainId: base.id,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Check if the loading text is displayed initially
		const loadingText = await canvas.findByText("Loading...");
		expect(loadingText).toBeInTheDocument();

		// Simulate a delay to allow the balance to load (mocked in Storybook)
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Check if the balance is displayed correctly
		const balanceText = await canvas.findByText(/ETH/); // Adjust regex based on expected balance format
		expect(balanceText).toBeInTheDocument();
	},
};

export const MainnetUSDC: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		tokenAddress: BY_CHAIN_ID[mainnet.id][Token.USDC] as Address,
		chainId: mainnet.id,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Check if the loading text is displayed initially
		const loadingText = await canvas.findByText("Loading...");
		expect(loadingText).toBeInTheDocument();

		// Simulate a delay to allow the balance to load (mocked in Storybook)
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Check if the balance is displayed correctly
		const balanceText = await canvas.findByText(/USDC/); // Adjust regex based on expected balance format
		expect(balanceText).toBeInTheDocument();
	},
};

export const OptimismUSDC: Story = {
	args: {
		address: BY_USER.vitalik.address as Address,
		tokenAddress: BY_CHAIN_ID[optimism.id][Token.USDC] as Address,
		chainId: optimism.id,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		// Check if the loading text is displayed initially
		const loadingText = await canvas.findByText("Loading...");
		expect(loadingText).toBeInTheDocument();

		// Simulate a delay to allow the balance to load (mocked in Storybook)
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Check if the balance is displayed correctly
		const balanceText = await canvas.findByText(/USDC/); // Adjust regex based on expected balance format
		expect(balanceText).toBeInTheDocument();
	},
};
