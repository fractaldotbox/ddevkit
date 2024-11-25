import { mainnet } from "viem/chains";
import { describe, expect, test } from "vitest";
import { useGetAttestations } from "./get-attestations";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";

/**
 * @vitest-environment jsdom
 */
describe("attestatiosn", () => {
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

	// TODO provider
	test("should return an array of attestations", async () => {
		const { result } = renderHook(
			() =>
				useGetAttestations({
					chainId: mainnet.id,
					address: "0x1CB34c1eC454708e7C849975E8e545B54417CdFf",
				}),
			{ wrapper },
		);

		await waitFor(() => expect(result.current.isLoading).toBe(false));

		await waitFor(() => expect(result.current.isSuccess).toBe(true));

		//    const attestations = await useGetAttestations({
		//     chainId: mainnet.id
		//    })
	});
});
