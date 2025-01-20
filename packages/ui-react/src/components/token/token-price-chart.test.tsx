import { render, screen } from "@testing-library/react";
import { mainnet } from "viem/chains";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGetChartWithMultipleTokens } from "#hooks/data/use-defillama.js";
import { TokenPriceChart } from "./token-price-chart";

// Mock the hooks
vi.mock("#hooks/data/use-defillama.js", () => ({
	useGetChartWithMultipleTokens: vi.fn(),
}));

describe("TokenPriceChart", () => {
	const mockProps = {
		chain: mainnet,
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

		render(<TokenPriceChart {...mockProps} />);
		expect(screen.getByText("Loading...")).toBeInTheDocument();
	});

	it("should render TokenPriceChartWithFeed when data is loaded", () => {
		const mockData = {
			"ethereum:0xdF574c24545E5FfEcb9a659c229253D4111d87e1": [
				{ timestamp: 1234567890, price: 100 },
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

		render(<TokenPriceChart {...mockProps} />);
		// Since TokenPriceChartWithFeed is a separate component, we just verify that
		// the loading state is not present when data is loaded
		expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
	});
});
