import { NFTCard as NFTCard$ } from "@geist/ui-react/components/nft/nft-card";
import type { Meta, StoryObj } from "@storybook/react";
import { withWagmiProvider } from "#stories/decorators/wagmi.tsx";

interface ERC721CardStoriesProps {
	tokenId: string;
	contractAddress: string;
}

function ERC721CardStories({
	tokenId,
	contractAddress,
}: ERC721CardStoriesProps) {
	return (
		<NFTCard$
			tokenId={tokenId}
			contractAddress={contractAddress}
			className="max-w-96 min-w-40"
		/>
	);
}

const meta = {
	title: "NFT/ERC721Card",
	component: ERC721CardStories,
	parameters: {
		layout: "centered",
	},
	decorators: [withWagmiProvider()],
} satisfies Meta<typeof ERC721CardStories>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ERC721Card: Story = {
	args: {
		tokenId: "6273",
		contractAddress: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
	},
	parameters: {},
};
