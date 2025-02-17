import { useQuery } from "@tanstack/react-query";
import type {
	AddressOrEns,
	EfpApiOptions,
	EfpEnsData,
	EfpFollower,
	EfpRecord,
	EfpUserStats,
} from "./efp";

const EFP_ENDPOINT = "https://api.ethfollow.xyz/api/v1/";

// TODO support paginations, sort
// hard limit is unkonwn
export const getEndpointUserFollowing = (
	addressOrEns: AddressOrEns,
	options?: EfpApiOptions,
) => {
	const { limit = 100, sort = "followers" } = options || {};
	return `${EFP_ENDPOINT}users/${addressOrEns}/following?${new URLSearchParams({ limit: limit.toString(), sort }).toString()}`;
};

export const getEndpointUserFollowers = (
	addressOrEns: AddressOrEns,
	options?: EfpApiOptions,
) => {
	const { limit = 100, sort = "followers" } = options || {};
	return `${EFP_ENDPOINT}users/${addressOrEns}/followers?${new URLSearchParams({ limit: limit.toString(), sort }).toString()}`;
};

export const getEndpointEnsData = (
	addressOrEns: AddressOrEns,
	options?: EfpApiOptions,
) => {
	const { limit = 10, sort = "followers" } = options || {};
	return `${EFP_ENDPOINT}users/${addressOrEns}/ens?${new URLSearchParams({ limit: limit.toString(), sort }).toString()}`;
};

export const getEndpointUserStats = (addressOrEns: AddressOrEns) => {
	return `${EFP_ENDPOINT}users/${addressOrEns}/stats`;
};

// TODO use options at query key
export const useFollowers = (
	addressOrEns?: AddressOrEns,
	options?: EfpApiOptions,
) => {
	return useQuery<{ followers: EfpFollower[] }>({
		queryKey: ["ethfollow.followers", addressOrEns],
		queryFn: async () => {
			const endpoint = getEndpointUserFollowers(addressOrEns!, options);

			return fetch(endpoint).then((res) => res.json());
		},
		enabled: !!addressOrEns,
	});
};

export const useFollowing = (addressOrEns: AddressOrEns) => {
	return useQuery<{ following: EfpRecord[] }>({
		queryKey: ["ethfollow.following", addressOrEns],
		queryFn: async () => {
			const endpoint = getEndpointUserFollowing(addressOrEns);

			return fetch(endpoint).then((res) => res.json());
		},
	});
};

export const useEnsData = (addressOrEns: AddressOrEns) => {
	return useQuery<{ ens: EfpEnsData }>({
		queryKey: ["ethfollow.ens", addressOrEns],
		queryFn: async () => {
			const endpoint = getEndpointEnsData(addressOrEns);

			return fetch(endpoint).then((res) => res.json());
		},
	});
};

export const useUserStats = (addressOrEns: AddressOrEns) => {
	return useQuery<EfpUserStats>({
		queryKey: ["ethfollow.user-stats", addressOrEns],
		queryFn: async () => {
			const endpoint = getEndpointUserStats(addressOrEns);

			return fetch(endpoint).then((res) => res.json());
		},
	});
};
