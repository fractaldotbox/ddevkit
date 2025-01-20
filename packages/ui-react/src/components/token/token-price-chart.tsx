"use client";

import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import { asCaip19Id } from "@geist/domain/token/cross-chain.js";
import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry.js";
import type { TokenSelector } from "@geist/domain/token/token.js";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { Address, Chain } from "viem";
import { useConfig } from "wagmi";
import {
	useGetChartWithMultipleTokens,
	useGetPriceWithMultipleTokenIds,
} from "#hooks/data/use-defillama.js";
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

	console.log("byId", tokenInfoByTokenId);

	// TODO load tokenInfoByTokenId

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
