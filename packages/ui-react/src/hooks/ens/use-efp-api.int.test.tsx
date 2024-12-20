import { describe, expect, test } from "vitest";
import {
	getEndpointEnsData,
	getEndpointUserFollowers,
	getEndpointUserFollowing,
	useEnsData,
	useFollowers,
	useFollowing,
} from "./use-efp-api";

import { BY_USER } from "@repo/domain/user.fixture";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";

describe("endpoints", () => {
	test("#getEndpointUserFollowing", () => {
		const url = getEndpointUserFollowing(BY_USER.vitalik.address, {
			limit: 100,
		});

		expect(url).toEqual(
			"https://api.ethfollow.xyz/api/v1/users/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/following?limit=100&sort=followers",
		);
	});
	test("#getEndpointUserFollowers", () => {
		const url = getEndpointUserFollowers(BY_USER.vitalik.address);
		expect(url).toEqual(
			"https://api.ethfollow.xyz/api/v1/users/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/followers?limit=100&sort=followers",
		);
	});

	test("#getEndpointEnsData", () => {
		const url = getEndpointEnsData(BY_USER.vitalik.ens);
		expect(url).toEqual(
			"https://api.ethfollow.xyz/api/v1/users/vitalik.eth/ens?limit=10&sort=followers",
		);
	});
});

/**
 * @vitest-environment jsdom
 */
describe("efp api", () => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
			},
		},
	});
	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);

	test("should return followers", async () => {
		const { result } = renderHook(
			() => useFollowers(BY_USER.vitalik.ens, { limit: 1000 }),
			{ wrapper },
		);
		await waitFor(() => expect(result.current.isLoading).toBe(false), {
			timeout: 5000,
		});

		expect(result.current.data.followers.length > 800).toBe(true);
	});
	test("should return following", async () => {
		const { result } = renderHook(() => useFollowing(BY_USER.vitalik.ens), {
			wrapper,
		});
		await waitFor(() => expect(result.current.isLoading).toBe(false));

		expect(result.current.data.following.length).toBe(0);
	});
	test("should return ens data", async () => {
		const { result } = renderHook(() => useEnsData(BY_USER.vitalik.ens), {
			wrapper,
		});
		await waitFor(() => expect(result.current.isLoading).toBe(false));

		expect(result.current.data.ens.address).toBe(
			BY_USER.vitalik.address.toLowerCase(),
		);
	});
});
