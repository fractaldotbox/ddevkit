import { Badge } from "#components/shadcn/badge";
import { DataTable } from "#components/data-table";
import { resolveChainById } from "@repo/domain/chain/chain-resolver";
import { TransactionMeta } from "@repo/domain/transaction/transaction";
import {
	Explorer,
	ExplorerEntity,
	blockExplorerUrlFactory,
} from "#lib/explorer/url";
import { getShortAddress } from "#lib/utils/address";
import { getShortHex } from "#lib/utils/hex";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";
import { formatEther } from "viem";

export const txnTypeMap: Record<string, string> = {
	contract_call: "Contract Call",
	native_transfer: "Native Token Transfer",
	token_transfer: "Token Transfer",
	coin_transfer: "Token Transfer",
};

export interface TransactionTableProps {
	transactions: TransactionMeta[];
	chainId?: number;
	explorer?: Explorer;
	itemsPerPage?: number;
	withPagination?: boolean;
	withSorting?: boolean;
}

const getTxnTableCols = ({
	chainId,
	explorer,
}: {
	chainId: number;
	explorer: Explorer;
}): ColumnDef<TransactionMeta>[] => {
	const chain = resolveChainById(chainId);
	const createTxnUrl = blockExplorerUrlFactory({
		chain,
		config: {
			name: explorer,
		},
	});

	return [
		{
			accessorKey: "hash",
			header: "Txn Hash",
			cell: ({ row }) => {
				const txnHash = row.getValue<string>("hash") as `0x${string}`;
				const txnUrl = createTxnUrl({
					chain,
					entity: ExplorerEntity.Transaction,
					params: {
						txnHash,
					},
				});
				return (
					<a
						href={txnUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center hover:underline"
					>
						{txnHash && getShortHex(txnHash)}
						<ExternalLink className="ml-1 h-4 w-4" />
					</a>
				);
			},
		},
		{
			accessorKey: "from",
			header: "From",
			cell: ({ row }) => {
				const address = row.getValue<string>("from") as `0x${string}`;
				return <>{getShortAddress(address)}</>;
			},
		},
		{
			accessorKey: "to",
			header: "To",
			cell: ({ row }) => {
				const address = row.getValue<string>("to") as `0x${string}`;
				return <>{getShortAddress(address)}</>;
			},
		},
		{
			accessorKey: "displayedTxType",
			header: "Txn Type",
			cell: ({ row }) => {
				const txnType = row.getValue<string>("displayedTxType");
				return <Badge variant="secondary">{txnTypeMap[txnType]}</Badge>;
			},
		},
		{
			accessorKey: "value",
			header: ({ column }) => (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="cursor-pointer hover:text-black flex items-center gap-2"
				>
					Value (ETH)
					<ArrowUpDown className="h-4 w-4" />
				</div>
			),
			cell: ({ row }) => {
				const rawValue = row.getValue<bigint>("value");
				return <>{formatEther(rawValue)} ETH</>;
			},
		},
		{
			accessorKey: "gas",
			header: ({ column }) => (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="cursor-pointer hover:text-black flex items-center gap-2"
				>
					Gas Used (ETH)
					<ArrowUpDown className="h-4 w-4" />
				</div>
			),
			cell: ({ row }) => {
				const rawValue = row.getValue<bigint>("gas");
				return <>{formatEther(rawValue)} ETH</>;
			},
		},
		{
			accessorKey: "blockNumber",
			header: ({ column }) => (
				<div
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					className="cursor-pointer hover:text-black flex items-center gap-2"
				>
					Block Number
					<ArrowUpDown className="h-4 w-4" />
				</div>
			),
			cell: ({ row }) => {
				const rawValue = row.getValue<bigint>("blockNumber");
				return <>{Number(rawValue)}</>;
			},
		},
	] as ColumnDef<TransactionMeta>[];
};

export function TransactionTable({
	transactions,

	// defaults to ETH mainnet
	chainId = 1,
	explorer = Explorer.Blockscout,
}: TransactionTableProps) {
	console.log("printing hookx", { chainId, explorer });

	return (
		<div className="w-full">
			<DataTable
				columns={getTxnTableCols({ chainId, explorer })}
				data={transactions}
			/>
		</div>
	);
}
