import { TransactionMeta } from "@geist/domain/transaction/transaction";
import { Label } from "@radix-ui/react-label";
import { AddressBadge } from "#components/identity/address-badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#components/shadcn/card";
import { Separator } from "#components/shadcn/separator";
import { Skeleton } from "#components/shadcn/skeleton";
import { TokenChipWithInfo } from "#components/token/token-chip-with-info";
import type { Token } from "@geist/domain/token/token";
import { getShortHex } from "#lib/utils/hex";

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

export const TransactionCardWithDetailsContent = ({
	transaction,
	nativeCurrency,
}: {
	transaction: TransactionMeta;
	nativeCurrency: Token;
}) => {
	if (!transaction) {
		return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
	}

	console.log("transaction", transaction);
	const { from, to, value } = transaction;

	const { tokenTransfers } = transaction;

	// TODO input native currency
	const token =
		value !== undefined
			? tokenTransfers.length > 0
				? tokenTransfers[0]
				: nativeCurrency
			: null;

	return (
		<CardContent>
			<div className="flex w-full items-center gap-2">
				<div className="grid flex-1 auto-rows-min gap-0.5">
					<div className="text-xs text-muted-foreground">Tranfer</div>
					<div className="flex items-center gap-1 text-2xl font-bold tabular-nums leading-none">
						<div className="flex flex-col">
							<div className="text-sm font-normal text-muted-foreground">
								<span className="text-sm font-normal">
									{token && <TokenChipWithInfo {...token} amount={value} />}
								</span>
							</div>
						</div>
					</div>
				</div>
				<Separator orientation="vertical" className="mx-2 h-10 w-px" />
				<div className="grid flex-1 auto-rows-min gap-0.5">
					<div className="text-xs text-muted-foreground">From</div>
					<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
						<span className="text-sm font-normal">
							{from && <AddressBadge address={from} />}
						</span>
					</div>
					<div className="text-xs text-muted-foreground">To</div>
					<div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
						<span className="text-sm font-normal">
							{to && <AddressBadge address={to} />}
						</span>
					</div>
				</div>
			</div>

			<Label></Label>
		</CardContent>
	);
};

// some key fields from https://easscan.org/offchain/attestation/view/0x49dff46654fe740241026c1a717ace9ec439abe26124cd925b0ba1df296433c5
export const TransactionCardWithDetails = ({
	transaction,
	txnUrl,
	nativeCurrency,
}: {
	transaction: TransactionMeta;
	txnUrl: string;
	nativeCurrency: Token;
}) => {
	return (
		<Card>
			{
				<CardHeader>
					<CardTitle>Transaction</CardTitle>
					<CardDescription>
						<div className="flex flex-col">
							<div className="text-xs text-muted-foreground">
								<a href={txnUrl} target="_blank" rel="noreferrer">
									{transaction.hash && getShortHex(transaction.hash)}
								</a>
							</div>
						</div>

						<div className="flex flex-col">
							<span className="text-xs font-normal">Transfer</span>
						</div>
						<div className="text-xs text-muted-foreground">
							{/* Created: {format(new Date(attestation.time * 1000), 'yyyy/MM/dd HH:MM:ss')} */}
						</div>
					</CardDescription>
				</CardHeader>
			}
			<CardContent>
				{transaction && (
					<TransactionCardWithDetailsContent
						transaction={transaction}
						nativeCurrency={nativeCurrency}
					/>
				)}
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
};
