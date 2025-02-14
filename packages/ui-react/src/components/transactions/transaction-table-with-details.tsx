import { Skeleton } from "#components/shadcn/skeleton";
import { useGetTransactions } from "#hooks/data/use-blockscout";
import {
	type GetTxnByFilterQuery,
	asTransactionMeta,
} from "#lib/blockscout/api";
import { Explorer } from "#lib/explorer/url";
import { TransactionTable } from "./transaction-table";

export type TransactionTableWithDetailsProps = GetTxnByFilterQuery & {
	chainId?: number;
};

export const TransactionTableWithDetails = (
	props: TransactionTableWithDetailsProps,
) => {
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
};
