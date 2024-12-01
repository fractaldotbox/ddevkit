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
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { getShortAddress } from "@/utils/address";

export interface TransactionTableProps {
  transactions: TransactionMeta[];
  itemsPerPage?: number;
  withPagination?: boolean;
  withSorting?: boolean;
}

export const columns: ColumnDef<TransactionMeta>[] = [
  {
    accessorKey: "hash",
    header: "Txn Hash",
    cell: ({ row }) => {
      const txnHash = row.getValue<string>("hash") as `0x${string}`;

      return (
        <a
          href={`https://eth.blockscout.com/tx/${txnHash}`}
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
];

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
