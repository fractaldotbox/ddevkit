// https://github.com/ethereumfollowprotocol/app/blob/main/src/components/home/landing/components/social-graph-art.tsx
import { AddressOrEns, useFollowers } from "@/hooks/use-efp-api";
import { useEffect, useState } from "react";
import {
	ForceGraph2D,
	ForceGraph3D,
	ForceGraphAR,
	ForceGraphVR,
} from "react-force-graph";
import * as THREE from "three";
import { Address } from "viem";

export const useFollowerAvatars = ({
	addressOrEns,
}: { addressOrEns: AddressOrEns }) => {
	const { data, isLoading, isSuccess } = useFollowers(addressOrEns);

	return { data, isLoading, isSuccess };

	// by name
};

export const SocialGraph = ({
	addressOrEns,
}: { addressOrEns: AddressOrEns }) => {
	// TODO

	const [graphData, setGraphData] = useState({
		nodes: [],
		links: [],
	});

	const { data, isLoading, isSuccess } = useFollowerAvatars({ addressOrEns });

	useEffect(() => {
		if (!data) {
			return;
		}
		console.log("data", data);
		const { followers } = data;

		const followerAvatars = followers.slice(0, 20).map(({ address }) => {
			return {
				id: address,
				avatarUrl: `https://euc.li/vitalik.eth`,
			};
		});

		const gData = {
			nodes: followerAvatars
				.map(({ avatarUrl, id }) => ({ id, avatarUrl }))
				.concat({
					id: addressOrEns as Address,
					avatarUrl: `https://euc.li/vitalik.eth`,
				}),
			links: followerAvatars.map(({ id }) => ({
				source: id,
				target: addressOrEns,
			})),
		};
		console.log("gData", gData);
		setGraphData(gData);
	}, [isLoading]);
	// Random connected graph

	return (
		<ForceGraph3D
			graphData={graphData}
			nodeThreeObject={({ avatarUrl }: any) => {
				const imgTexture = new THREE.TextureLoader().load(avatarUrl);
				imgTexture.colorSpace = THREE.SRGBColorSpace;
				const material = new THREE.SpriteMaterial({ map: imgTexture });
				const sprite = new THREE.Sprite(material);
				sprite.scale.set(12, 12);

				// return (
				//     <div>
				//         hi
				//     </div>
				// )

				return sprite;
			}}
		/>
	);
};
