import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { mainnet } from "viem/chains";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { WagmiProvider } from "wagmi";
import { useGetChartWithMultipleTokens } from "#hooks/data/use-defillama";
import { WAGMI_CONFIG } from "#lib/utils/wagmi-config";
import { TokenPriceChart } from "./token-price-chart";

global.ResizeObserver = class {
	observe() {}
	unobserve() {}
	disconnect() {}
};

// Mock the hooks
vi.mock("#hooks/data/use-defillama", () => ({
	useGetChartWithMultipleTokens: vi.fn(),
}));

const WrappedTokenPriceChart = (
	props: Parameters<typeof TokenPriceChart>[0],
) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<WagmiProvider config={WAGMI_CONFIG}>
				<TokenPriceChart {...props} />
			</WagmiProvider>
		</QueryClientProvider>
	);
};

describe("TokenPriceChart", () => {
	const mockProps = {
		chainId: mainnet.id,
		tokenIds: "ethereum:0xdF574c24545E5FfEcb9a659c229253D4111d87e1",
		tokenInfoByTokenId: {
			"ethereum:0xdF574c24545E5FfEcb9a659c229253D4111d87e1": {
				symbol: "TEST",
			},
		},
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should show loading state", () => {
		(
			useGetChartWithMultipleTokens as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			isLoading: true,
			isSuccess: false,
			data: null,
			error: null,
		});

		render(<WrappedTokenPriceChart {...mockProps} />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should render TokenPriceChartWithFeed when data is loaded", () => {
		const mockData = {
			"ethereum:0xdF574c24545E5FfEcb9a659c229253D4111d87e1": [
				{ happenAt: 1234567890, price: 100 },
			],
		};

		(
			useGetChartWithMultipleTokens as unknown as ReturnType<typeof vi.fn>
		).mockReturnValue({
			isLoading: false,
			isSuccess: true,
			data: mockData,
			error: null,
		});

		render(<WrappedTokenPriceChart {...mockProps} />);
		// Since TokenPriceChartWithFeed is a separate component, we just verify that
		// the loading state is not present when data is loaded
		expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
	});
});
