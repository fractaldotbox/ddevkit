import type { ChartConfig } from "#components/shadcn/chart";

import { asCaip19Id } from "@geist/domain/token/multi-chain";
import type { TokenSelector } from "@geist/domain/token/token";
import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry";
import type { Address, Chain } from "viem";
import { useConfig } from "wagmi";
import { useGetChartWithMultipleTokens } from "#hooks/data/use-defillama";
import { useTokenInfoBulk } from "./token";
import { TokenPriceChartWithFeed } from "./token-price-chart-with-feed";

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
} satisfies ChartConfig;

export const TokenPriceChart = ({
	chain,
	tokens,
}: {
	chain: Chain;
	tokens: TokenSelector[];
}) => {
	const {
		data: tokenPriceFeedByTokenId,
		isLoading,
		isSuccess,
		error,
	} = useGetChartWithMultipleTokens(tokens);

	const config = useConfig();

	const { data: tokenInfoByTokenId = {} } = useTokenInfoBulk({
		chainId: chain.id,
		tokens,
		config,
	});

	console.log("data", isSuccess, error, tokenPriceFeedByTokenId);

	return isLoading ? (
		<div>Loading...</div>
	) : (
		<TokenPriceChartWithFeed
			tokenPriceFeedByTokenId={tokenPriceFeedByTokenId || {}}
			tokenInfoByTokenId={tokenInfoByTokenId}
		/>
	);
};
