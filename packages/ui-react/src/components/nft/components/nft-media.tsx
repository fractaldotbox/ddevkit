import { useNFT } from "./provider";

export function NFTMedia() {
	const { nftData } = useNFT();

	const imageUrl = nftData?.image_url;

	if (!imageUrl) {
		return <div className="aspect-square bg-neutral-200" />;
	}

	return (
		<div className="aspect-square">
			<img
				src={imageUrl}
				alt={nftData?.metadata?.name ?? ""}
				className="object-cover h-full w-full"
			/>
		</div>
	);
}
