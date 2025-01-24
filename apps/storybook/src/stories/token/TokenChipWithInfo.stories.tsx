import { TokenChipWithInfo } from "@geist/ui-react/components/token/token-chip-with-info";
import type { Meta, StoryObj } from "@storybook/react";

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

export const ETHTokenChip: Story = {
	args: {
		imageUrl:
			"https://ethereum.org/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Feth-diamond-black.a042df77.png&w=828&q=75",
		name: "Ether",
		symbol: "ETH",
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
};
