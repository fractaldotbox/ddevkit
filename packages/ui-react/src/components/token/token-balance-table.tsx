import type { TokenBalanceEntry } from "#components/token/token-balance-entry";
import { Explorer } from "#lib/explorer/url";

import { formatUnitsWithLocale } from "@geist/domain/amount";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { DataTable } from "#components/data-table";

// ASSET_CROSS_CHAIN

const FormattedValueCell = ({
	value,
	style,
}: { value: any; style?: "currency" }) => {
	return (
		<>
			{formatUnitsWithLocale({
				value,
				exponent: 1,
				formatOptions: {
					style,
					maximumSignificantDigits: 2,
				},
			})}
		</>
	);
};

export interface TokenBalanceTableProps {
	tokenBalances: TokenBalanceEntry[];
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
					<FormattedValueCell value={row.getValue("value")} style="currency" />
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
