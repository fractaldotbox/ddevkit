import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransaction } from "@/hooks/use-blockscout";
import { TransactionMeta } from "@/lib/blockscout/api";
import { useTokenInfo } from "@/lib/token/token";
import { getShortHex } from "@/utils/hex";
import { Label } from "@radix-ui/react-label";
import { format } from "date-fns";
import { useMemo } from "react";
import { Address, Hex, Transaction, formatEther } from "viem";
import { mainnet } from "viem/chains";
import { useChainId, useToken } from "wagmi";
import { AddrsesBadge } from "../identity/AddressBadge";

export const TransactionSummary = ({
	transaction,
}: { transaction: TransactionMeta }) => {
	return (
		<div>
			Transaction Summary
			{/* {transaction} */}
		</div>
	);
};

export const TransactionCardContent = ({
	transaction,
}: { transaction: TransactionMeta }) => {
	if (!transaction) {
		return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
	}

	console.log("transaction", transaction);
	const { from, to, value } = transaction;

	return (
		<CardContent>
			<div className="flex w-full items-center gap-2">
				<div className="grid flex-1 auto-rows-min gap-0.5">
					<div className="text-xs text-muted-foreground">Tranfer</div>
					<div className="flex items-center gap-1 text-2xl font-bold tabular-nums leading-none">
						<div className="flex flex-col">
							<div className="text-sm font-normal text-muted-foreground">
								<span className="text-sm font-normal">
									{value !== undefined && formatEther(value)}
								</span>
							</div>
							<span className="text-sm font-normal text-muted-foreground">
								unit
								{transaction.unit}
							</span>
						</div>
					</div>
				</div>
				<Separator orientation="vertical" className="mx-2 h-10 w-px" />
				<div className="grid flex-1 auto-rows-min gap-0.5">
					<div className="text-xs text-muted-foreground">From</div>
					<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
						<span className="text-sm font-normal">
							{from && <AddrsesBadge address={from} />}
						</span>
					</div>
					<div className="text-xs text-muted-foreground">To</div>
					<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
						<span className="text-sm font-normal">
							{to && <AddrsesBadge address={to} />}
						</span>
					</div>
				</div>
			</div>

			<Label></Label>
		</CardContent>
	);
};

export const TransactionCardWithHash = ({
	txnHash,
}: {
	txnHash: string;
}) => {
	const { data: transaction } = useGetTransaction(txnHash);

	if (!txnHash || !transaction) {
		return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
	}

	return <TransactionCard transaction={transaction} />;
};

// some key fields from https://easscan.org/offchain/attestation/view/0x49dff46654fe740241026c1a717ace9ec439abe26124cd925b0ba1df296433c5
export const TransactionCard = ({
	transaction,
}: {
	transaction: TransactionMeta;
}) => {
	// TODO
	const { data: tokenInfo } = useTokenInfo({
		address: transaction.tokenTransfers?.[0].address,
	});

	return (
		<Card>
			{
				<CardHeader>
					<CardTitle>Transaction</CardTitle>
					<CardDescription>
						<div className="flex flex-col">
							<div className="text-xs text-muted-foreground">
								{transaction.hash && getShortHex(transaction.hash)}
							</div>
						</div>

						<div className="flex flex-col">
							<span className="text-xs font-normal">Transfer 100 ETH</span>
						</div>
						<div className="text-xs text-muted-foreground">
							{/* Created: {format(new Date(attestation.time * 1000), 'yyyy/MM/dd HH:MM:ss')} */}
						</div>
					</CardDescription>
				</CardHeader>
			}
			<CardContent>
				{transaction && <TransactionCardContent transaction={transaction} />}
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
};
