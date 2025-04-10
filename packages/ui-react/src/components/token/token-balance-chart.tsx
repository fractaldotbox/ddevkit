"use client";

import * as React from "react";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#components/shadcn/chart";

import { formatUnitsWithLocale } from "@geist/domain/amount";
import { aggregateBySymbol, sumTotal } from "@geist/domain/token/aggregate";
import type {
	TokenBalance,
	TokenBalanceEntry,
} from "@geist/domain/token/token-balance-entry";
import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry";
import { useStore } from "@nanostores/react";
import type { Atom } from "nanostores";
import { Label, Pie, PieChart } from "recharts";
import type { Address } from "viem";
import { TokenChipWithInfo } from "./token-chip-with-info";

const chartConfig = {} satisfies ChartConfig;

/**
 * recharts doesn't support bigint
 * rely on original over chart data for display
 * avoid conversion as most other components rely bigint
 */
export const TokenBalanceChart$ = ({
	$tokenBalances,
	$priceData,
	group,
	dataKey,
}: {
	$tokenBalances: Atom<TokenBalance[]>;
	$priceData: Atom<TokenPriceEntry[]>;
	group: string;
	dataKey: string;
}) => {
	const $tokenBalancesAggregated = aggregateBySymbol(
		$tokenBalances,
		$priceData,
	);

	const tokenBalancesAggregated = useStore(useStore($tokenBalancesAggregated));

	const tokenBalances = React.useMemo(
		() =>
			Object.entries(tokenBalancesAggregated).map(([, entry]) => {
				const { symbol = "", chainId, address, agg } = entry;

				return {
					symbol,
					chainId,
					address: address as Address,
					amount: agg.amount,
					value: agg.value,
				} as TokenBalance;
			}),
		[tokenBalancesAggregated],
	);

	if (group === "token") {
		return (
			<div>
				<TokenBalanceChart tokenBalances={tokenBalances} dataKey={dataKey} />
			</div>
		);
	}

	return <div>TokenBalanceChart</div>;
};

const formatter = (
	total: {
		amount: bigint;
		value: bigint;
	},
	dataKey: string,
) => {
	const value = total[dataKey as keyof typeof total];
	if (dataKey === "amount") {
		return formatUnitsWithLocale({
			value,
			exponent: 0,
		});
	}
	return formatUnitsWithLocale({
		value,
		exponent: 18,
		formatOptions: {
			style: "currency",
			maximumFractionDigits: 2,
		},
	});
};

export const TokenBalanceChart = ({
	tokenBalances,
	dataKey = "amount",
}: {
	tokenBalances: TokenBalance[];
	dataKey?: string;
}) => {
	const total = sumTotal(tokenBalances);

	const totalFormatted = React.useMemo(() => {
		return formatter(total, dataKey);
	}, [dataKey]);

	const chartData = tokenBalances.map((entry, i) => {
		const { amount, value = 0n, chainId } = entry;
		return {
			chainId,
			symbol: entry.symbol,
			amount: Number(amount) || 0,
			value: Number(value / 10n ** 18n) || 0,
			fill: `hsl(var(--chart-${i}))`,
		};
	});
	return (
		<div className="w-full h-full">
			<ChartContainer
				config={chartConfig}
				style={{ height: "600px", width: "600px" }}
				className="h-[600px] w-full"
			>
				<PieChart>
					<ChartTooltip
						cursor={false}
						content={
							<ChartTooltipContent
								hideLabel
								formatter={(v, name) => {
									const token = tokenBalances.find(
										({ symbol }) => name === symbol,
									)!;
									return (
										<div>
											<TokenChipWithInfo
												isShowValue={dataKey === "value"}
												{...token}
												amount={token.amount}
												value={token.value}
												decimals={dataKey === "value" ? 18 : 0}
											/>
										</div>
									);
								}}
							/>
						}
					/>
					<Pie
						data={chartData}
						label
						dataKey={dataKey}
						nameKey="symbol"
						innerRadius={60}
						strokeWidth={5}
					>
						<Label
							content={({ viewBox }) => {
								if (viewBox && "cx" in viewBox && "cy" in viewBox) {
									return (
										<text
											x={viewBox.cx}
											y={viewBox.cy}
											textAnchor="middle"
											dominantBaseline="middle"
										>
											<tspan
												x={viewBox.cx}
												y={viewBox.cy}
												className="fill-foreground text-3xl font-bold"
											>
												{totalFormatted}
											</tspan>
											<tspan
												x={viewBox.cx}
												y={(viewBox.cy || 0) + 24}
												className="fill-muted-foreground"
											>
												Balance
											</tspan>
										</text>
									);
								}
							}}
						/>
					</Pie>
				</PieChart>
			</ChartContainer>
		</div>
	);
};
