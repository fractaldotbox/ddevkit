import { TokenChip } from "@geist/ui-react/components/token/token-chip";
import { BY_CHAIN_ID, Token } from "@geist/ui-react/lib/token/config";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { mainnet, optimismSepolia } from "viem/chains";
import { withWagmiProvider } from "../decorators/wagmi";
import { setupCanvas } from "../utils/test-utils";

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

const testTokenChip = async (
	canvasElement: HTMLElement,
	symbol: string,
	amount?: string,
) => {
	const { canvas } = await setupCanvas(canvasElement);
	const tokenChip = await canvas.findByRole("button");
	expect(tokenChip).toBeInTheDocument();
	expect(tokenChip).toHaveTextContent(symbol);
	if (amount) {
		expect(tokenChip).toHaveTextContent(amount);
	}
};

export const ETHTokenChip: Story = {
	args: {
		chainId: mainnet.id,
	},
	play: async ({ canvasElement }) => {
		await testTokenChip(canvasElement, "ETH", "0");
	},
};

export const OptimismSepoliaTokenChip: Story = {
	args: {
		chainId: optimismSepolia.id,
	},
	play: async ({ canvasElement }) => {
		await testTokenChip(canvasElement, "ETH", "0");
	},
};

export const ETHTokenChipWithAmount: Story = {
	args: {
		chainId: mainnet.id,
		amount: 300000000000000000n,
	},
	play: async ({ canvasElement }) => {
		await testTokenChip(canvasElement, "ETH", "0.3");
	},
};

export const USDCTokenChipWithAmount: Story = {
	args: {
		chainId: mainnet.id,
		address: BY_CHAIN_ID[mainnet.id][Token.USDC],
		amount: 4567000123n,
		decimalsDisplayed: 4,
	},
	play: async ({ canvasElement }) => {
		await testTokenChip(canvasElement, "USDC", "4,567");
	},
};
