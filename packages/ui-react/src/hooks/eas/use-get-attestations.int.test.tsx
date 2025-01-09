import { mainnet, optimism } from "viem/chains";
import { describe, expect, test } from "vitest";
import { useGetAttestations } from "./use-get-attestations";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type React from "react";
import type { Address } from "viem";

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

	test.each([[mainnet.id, "0x1CB34c1eC454708e7C849975E8e545B54417CdFf"]])(
		`should return an array of attestations`,
		async (chainId: number, address: string) => {
			const { result } = renderHook(
				() =>
					useGetAttestations({
						chainId,
						address: address as Address,
					}),
				{ wrapper },
			);

			await waitFor(() => expect(result.current.isLoading).toBe(false), {
				timeout: 60000,
			});

			await waitFor(() => expect(result.current.isSuccess).toBe(true));

			expect(result.current.data).toBeDefined();
		},
	);
}, 60_000);
