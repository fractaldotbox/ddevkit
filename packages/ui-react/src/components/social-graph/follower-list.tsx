import { ScrollArea } from "#components/shadcn/scroll-area";
import { Separator } from "#components/shadcn/separator";
import { EfpFollowerWithName } from "#hooks/ens/efp";

export const FollowerListScrollable = ({
	followers,
}: { followers: EfpFollowerWithName[] }) => {
	return (
		<ScrollArea className="h-72 w-48 rounded-md border">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Followers</h4>
				{followers.map((follower: EfpFollowerWithName) => (
					<>
						<div key={follower.address} className="text-sm">
							{follower?.name || follower.address}
						</div>
						<Separator className="my-2" />
					</>
				))}
			</div>
		</ScrollArea>
	);
};
/**
 *  At https://ethfollow.xyz/, ENS resolved at backend 1 by 1
 *  https://github.com/ethereumfollowprotocol/api/blob/develop/src/router/api/v1/lists/following/index.ts#L80
 */
export const FollowerListEfp = ({
	addressOrEns,
}: { addressOrEns: AddressOrEns }) => {
	const { data, isLoading } = useFollowers(addressOrEns);
	console.log("data", addressOrEns, data, isLoading);
	const followers = data?.followers || [];

	// TODO resolve via direct gql queries

	return (
		<div>
			<FollowerListScrollable followers={followers} />
		</div>
	);
};
