import { formatUnitsWithLocale } from "@geist/domain/amount";
import { aggregateBySymbol } from "@geist/domain/token/aggregate.js";
import type {
	TokenBalance,
	TokenBalanceEntry,
} from "@geist/domain/token/token-balance-entry";
import type { TokenPriceEntry } from "@geist/domain/token/token-price-entry.js";
import { useStore } from "@nanostores/react";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import type { Atom } from "nanostores";
import React from "react";
import { DataTable } from "#components/data-table";
import { Explorer } from "#lib/explorer/url";

const FormattedValueCell = ({
	value,
	exponent = 0,
	style,
}: { value: any; exponent?: number; style?: "currency" }) => {
	return (
		<>
			{formatUnitsWithLocale({
				value,
				exponent,
				formatOptions: {
					style,
					maximumFractionDigits: 2,
				},
			})}
		</>
	);
};

export interface TokenBalanceTableProps {
	tokenBalances: TokenBalanceEntry[];
	explorer?: Explorer;
	chainId?: number;
	// explorer?: Explorer;
	itemsPerPage?: number;
	withPagination?: boolean;
	withSorting?: boolean;
}

const getCols = ({
	explorer,
}: {
	explorer: Explorer;
}): ColumnDef<TokenBalanceEntry>[] => {
	return [
		{
			accessorKey: "symbol",
			header: "Symbol",
			cell: ({ row }) => {
				console.log("row", row, row.getValue(), row.subRows);
				return <>{row.getValue("symbol")}</>;
			},
		},
		{
			accessorKey: "chainId",
			header: "ChainId",
			cell: ({ row }) => {
				console.log("row", row, row.getValue(), row.subRows);
				return <>{row.getValue("chainId")}</>;
			},
		},
		{
			accessorKey: "price",
			header: "Price",
			cell: ({ row }) => {
				return (
					<FormattedValueCell value={row.getValue("price")} style="currency" />
				);
			},
		},
		{
			accessorKey: "amount",
			header: "Amount",
			cell: ({ row }) => {
				return <FormattedValueCell value={row.getValue("amount")} />;
			},
		},
		{
			accessorKey: "value",
			header: "Value",
			cell: ({ row }) => {
				return (
					<FormattedValueCell
						value={row.getValue("value")}
						style="currency"
						exponent={18}
					/>
				);
			},
		},
		{
			id: "expand",
			header: "",
			cell: ({ row }) => {
				return row.getCanExpand() ? (
					<div
						onClick={row.getToggleExpandedHandler()}
						style={{ cursor: "pointer" }}
					>
						{row.getIsExpanded() ? (
							<ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
						) : (
							<ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
						)}
					</div>
				) : (
					""
				);
			},
		},
	] as ColumnDef<TokenBalanceEntry>[];
};

export function TokenBalanceTable$({
	$tokenBalances,
	$priceData,
}: {
	$tokenBalances: Atom<TokenBalance[]>;
	$priceData: Atom<TokenPriceEntry[]>;
}) {
	const $tokenBalancesAggregated = aggregateBySymbol(
		$tokenBalances,
		$priceData,
	);

	const tokenBalancesAggregated = useStore(useStore($tokenBalancesAggregated));

	const tokenBalanceEntries = React.useMemo(
		() =>
			Object.entries(tokenBalancesAggregated).map(([, entry]) => {
				const { symbol, chainId, agg } = entry;

				return {
					price: entry.subEntries?.[0]?.price || 0.0,
					amount: agg.amount,
					value: agg.value,
					subEntries: entry.subEntries,
				};
			}),
		[tokenBalancesAggregated],
	) as TokenBalanceEntry[];

	return <TokenBalanceTable tokenBalances={tokenBalanceEntries} />;
}

export function TokenBalanceTable({
	tokenBalances,
	explorer = Explorer.Blockscout,
}: TokenBalanceTableProps) {
	// load and inject token info in bulk

	return (
		<div className="w-full">
			<DataTable
				columns={getCols({ explorer })}
				data={tokenBalances}
				tableConfig={{
					getSubRows: (row) => row.subEntries,
				}}
			/>
		</div>
	);
}
