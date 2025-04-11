import { TokenChipWithInfo } from "@geist/ui-react/components/token/token-chip-with-info";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import { setupCanvas } from "../utils/test-utils";

const meta = {
	title: "OnchainInfo/TokenChipWithInfo",
	component: TokenChipWithInfo,
	parameters: {
		layout: "centered",
	},
	args: {},
	decorators: [],
} satisfies Meta<typeof TokenChipWithInfo>;

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
	const image = await canvas.findByRole("img");
	expect(image).toBeInTheDocument();
	expect(tokenChip).toHaveTextContent(symbol);
	if (amount) {
		expect(tokenChip).toHaveTextContent(amount);
	}
};

export const ETHTokenChip: Story = {
	args: {
		imageUrl:
			"https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Feth-diamond-black.a042df77.png&w=828&q=75",
		name: "Ether",
		symbol: "ETH",
	},
	play: async ({ canvasElement }) => {
		await testTokenChip(canvasElement, "ETH");
	},
};

export const ETHTokenChipWithAmount: Story = {
	args: {
		imageUrl:
			"https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Feth-diamond-black.a042df77.png&w=828&q=75",
		name: "Ether",
		symbol: "ETH",
		amount: 300000000000000000n,
		decimals: 18,
		maximumFractionDigits: 1,
	},
	play: async ({ canvasElement }) => {
		await testTokenChip(canvasElement, "ETH", "0.3");
	},
};

export const ETHTokenChipWithValue: Story = {
	args: {
		imageUrl:
			"https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Feth-diamond-black.a042df77.png&w=828&q=75",
		name: "Ether",
		symbol: "ETH",
		value: 1234500000000000000000n,
		decimals: 18,
		maximumFractionDigits: 1,
		isShowValue: true,
	},
	play: async ({ canvasElement }) => {
		await testTokenChip(canvasElement, "ETH", "$1,234.50");
	},
};
