import { useEffect, useMemo, useState } from "react";
import { getNames } from "#/hooks/ens/use-ensjs";
import { AddressOrEns, EfpFollowerWithName } from "#hooks/ens/efp";
import { FollowerListScrollable } from "./follower-list";

/**
 * This one is client-side based dynamic resolving
 * Better to opt for SSR
 */
export const FollowerListEnsjs = ({
	addressOrEns,
}: { addressOrEns: AddressOrEns }) => {
	const [followersWithNames, setFollowersWithNames] = useState<
		EfpFollowerWithName[]
	>([]);

	const { data, isLoading, isSuccess } = useFollowers(addressOrEns);
	const followers = data?.followers || [];

	// consider extracted as common hook but ensure treeshaking
	useEffect(() => {
		if (!isSuccess) return;
		(async () => {
			const names = await getNames({
				addresses: followers.map((follower) => follower.address),
			});
			// stable order without missing slot
			const followersWithNames = followers.map((follower, index) => {
				return {
					...follower,
					...names?.[index],
				};
			});
			setFollowersWithNames(followersWithNames);
		})();
	}, [isSuccess, followers?.length]);

	return (
		<div>
			<div>{addressOrEns}</div>
			<FollowerListScrollable followers={followersWithNames} />
		</div>
	);
};
