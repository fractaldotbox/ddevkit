import { Skeleton } from "#components/shadcn/skeleton";
import { useGetTransactions } from "#hooks/data/use-blockscout";
import {
	type GetTxnByFilterQuery,
	asTransactionMeta,
} from "#lib/blockscout/api";
import { Explorer } from "#lib/explorer/url";
import { TransactionTableWithDetails } from "./transaction-table-with-details";

export type TransactionTableProps = GetTxnByFilterQuery & {
	chainId?: number;
};

export const TransactionTable = (props: TransactionTableProps) => {
	const { data, isPending, isLoading } = useGetTransactions(props);
	if (isPending || isLoading)
		return <Skeleton className="h-[300px] w-[800px]" />;

	return (
		<TransactionTableWithDetails
			transactions={(data || []).map((item: any) => asTransactionMeta(item))}
			explorer={Explorer.Blockscout}
			chainId={props.chainId || 1}
		/>
	);
};
