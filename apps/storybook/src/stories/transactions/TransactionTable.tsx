import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TransactionMeta } from "@/lib/domain/transaction/transaction";
import { getShortHex } from "@/utils/hex";
import {
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	ExternalLink,
} from "lucide-react";
import React, { useState } from "react";
import { formatEther, formatGwei } from "viem";
import { AddressBadge } from "../identity/AddressBadge";

export interface TransactionTableProps {
	transactions: TransactionMeta[];
	itemsPerPage?: number;
	withPagination?: boolean;
	withSorting?: boolean;
}

export function TransactionTable({
	transactions,
	itemsPerPage = 10,
	withPagination = false,
	withSorting = true,
}: TransactionTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [sortConfig, setSortConfig] = useState<{
		key: keyof TransactionMeta;
		isAsc: boolean;
	} | null>(null);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const sortedTransactions = React.useMemo(() => {
		let sortableTransactions = [...transactions];
		if (sortConfig !== null) {
			sortableTransactions.sort((a, b) => {
				if (
					(a[sortConfig.key || "transactionIndex"] || 0) <
					(b[sortConfig.key || "transactionIndex"] || 0)
				) {
					return sortConfig.isAsc ? -1 : 1;
				}
				if (
					(a[sortConfig.key || "transactionIndex"] || 0) >
					(b[sortConfig.key || "transactionIndex"] || 0)
				) {
					return sortConfig.isAsc ? 1 : -1;
				}
				return 0;
			});
		}
		return sortableTransactions;
	}, [transactions, sortConfig]);

	const currentTransactions = sortedTransactions.slice(
		indexOfFirstItem,
		indexOfLastItem,
	);

	const totalPages = Math.ceil(transactions.length / itemsPerPage);

	const requestSort = (key: keyof TransactionMeta) => {
		let isAsc = true;
		if (sortConfig && sortConfig.key === key && sortConfig.isAsc) {
			isAsc = false;
		}
		setSortConfig({ key, isAsc });
	};

	return (
		<div className="w-full">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead
							className="cursor-pointer hover:text-black"
							onClick={() => {
								if (withSorting) requestSort("hash");
							}}
						>
							<div className="flex items-center">
								Txn Hash{" "}
								{withSorting && <ArrowUpDown className="ml-2 h-4 w-4" />}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:text-black"
							onClick={() => {
								if (withSorting) requestSort("from");
							}}
						>
							<div className="flex items-center">
								From {withSorting && <ArrowUpDown className="ml-2 h-4 w-4" />}
							</div>
						</TableHead>
						<TableHead
							className="cursor-pointer hover:text-black"
							onClick={() => {
								if (withSorting) requestSort("to");
							}}
						>
							<div className="flex items-center">
								To {withSorting && <ArrowUpDown className="ml-2 h-4 w-4" />}
							</div>
						</TableHead>
						<TableHead
							className="text-right cursor-pointer hover:text-black"
							onClick={() => {
								if (withSorting) requestSort("value");
							}}
						>
							<div className="flex items-center">
								Value (ETH){" "}
								{withSorting && <ArrowUpDown className="ml-2 h-4 w-4" />}
							</div>
						</TableHead>
						<TableHead
							className="text-right cursor-pointer hover:text-black"
							onClick={() => {
								if (withSorting) requestSort("gas");
							}}
						>
							<div className="flex items-center">
								Gas Used (ETH){" "}
								{withSorting && <ArrowUpDown className="ml-2 h-4 w-4" />}
							</div>
						</TableHead>
						<TableHead
							className="text-right cursor-pointer hover:text-black"
							onClick={() => {
								if (withSorting) requestSort("blockNumber");
							}}
						>
							<div className="flex items-center">
								Block Number{" "}
								{withSorting && <ArrowUpDown className="ml-2 h-4 w-4" />}
							</div>
						</TableHead>
						{/* <TableHead>Status</TableHead> */}
					</TableRow>
				</TableHeader>
				<TableBody>
					{currentTransactions.map((transaction) => (
						<TableRow key={transaction.hash}>
							<TableCell className="font-medium">
								<a
									href={`https://etherscan.io/tx/${transaction.hash}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center hover:underline"
								>
									{transaction.hash && getShortHex(transaction.hash)}
									<ExternalLink className="ml-1 h-4 w-4" />
								</a>
							</TableCell>
							<TableCell>
								{transaction.from && (
									<AddressBadge address={transaction.from} />
								)}
							</TableCell>
							<TableCell>
								{transaction.to && <AddressBadge address={transaction.to} />}
							</TableCell>
							<TableCell className="text-right">
								{formatEther(transaction.value)} ETH
							</TableCell>
							<TableCell className="text-right">
								{formatEther(transaction.gas || 0n)} ETH
							</TableCell>
							<TableCell className="text-right">
								{(transaction.blockNumber || 0n).toString()}
							</TableCell>
							{/* <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${
                    transaction. === "success"
                      ? "bg-green-100 text-green-800"
                      : transaction.status === "failed"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {transaction.status}
                </span>
              </TableCell> */}
						</TableRow>
					))}
				</TableBody>
			</Table>
			{withPagination && (
				<div className="flex items-center justify-between space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					>
						<ChevronLeft className="h-4 w-4" />
						Previous
					</Button>
					<div className="text-sm text-muted-foreground">
						Page {currentPage} of {totalPages}
					</div>
					<Button
						variant="outline"
						size="sm"
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
					>
						Next
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
