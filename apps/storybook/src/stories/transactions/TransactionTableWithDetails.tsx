import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/hooks/use-blockscout";
import { GetTxnByFilterQuery, asTransactionMeta } from "@/lib/blockscout/api";
import { Explorer } from "@/lib/explorer/url";
import { TransactionTable } from "./TransactionTable";

export type TransactionTableWithDetailsProps = GetTxnByFilterQuery & {
	chainId?: number;
};

export function TransactionTableWithDetails(
	props: TransactionTableWithDetailsProps,
) {
	const { data, isPending, isLoading } = useGetTransactions(props);

	if (isPending || isLoading)
		return <Skeleton className="h-[300px] w-[800px]" />;

	return (
		<TransactionTable
			transactions={(data || []).map((item: any) => asTransactionMeta(item))}
			explorer={Explorer.Blockscout}
			chainId={props.chainId || 1}
		/>
	);
}
