import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { useEnsAvatar } from "wagmi";
import { Avatar as AvatarPrimitive } from "#components/shadcn/avatar";
import { Skeleton } from "#components/shadcn/skeleton";
import { AvatarDisplayed } from "./avatar";

export const AvatarWagmi = ({
	ens,
}: {
	ens: string;
}) => {
	const { data: ensAvatar, isLoading } = useEnsAvatar({
		chainId: mainnet.id,
		name: normalize(ens),
	});

	if (isLoading || !ensAvatar) {
		return (
			<AvatarPrimitive>
				<Skeleton className="w-full rounded-full bg-gray-200" />
			</AvatarPrimitive>
		);
	}
	return <AvatarDisplayed addressOrEns={ens} avatarSrc={ensAvatar} />;
};
