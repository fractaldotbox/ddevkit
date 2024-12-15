// support ENS, basename
// Option to use ipfs gateway, ens metadata services

import {
	AvatarFallback,
	AvatarImage,
	Avatar as AvatarPrimitive,
} from "#components/shadcn/avatar.tsx";
import { Skeleton } from "#components/shadcn/skeleton.tsx";
import { MetadataService, useIdentity } from "#/hooks/use-identity";

// support direct props override while consider extract into common provider

export const AvatarDisplayed = ({
	addressOrEns,
	avatarSrc,
}: {
	addressOrEns: string;
	avatarSrc: string;
}) => (
	<AvatarPrimitive>
		<AvatarImage src={avatarSrc} alt={addressOrEns} />
		<AvatarFallback>{addressOrEns}</AvatarFallback>
	</AvatarPrimitive>
);

// import { getEnsName } from '@wagmi/core'

export const Avatar = ({
	addressOrEns,
}: {
	addressOrEns: string;
}) => {
	const { avatarSrc, isLoading } = useIdentity(
		addressOrEns,
		MetadataService.Efp,
	);

	if (isLoading) {
		return (
			<AvatarPrimitive>
				<Skeleton className="w-full rounded-full bg-gray-200" />
			</AvatarPrimitive>
		);
	}
	return <AvatarDisplayed addressOrEns={addressOrEns} avatarSrc={avatarSrc} />;
};
