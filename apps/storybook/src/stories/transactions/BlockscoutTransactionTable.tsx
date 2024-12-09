import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/hooks/use-blockscout";
import { GetTxnByFilterQuery, asTransactionMeta } from "@/lib/blockscout/api";
import { TransactionTable } from "./TransactionTable";
import { Explorer } from "@/lib/explorer/url";

export type BlockscoutTransactionTableProps = GetTxnByFilterQuery & {
  chainId?: number;
};

export function BlockscoutTransactionTable(
  props: BlockscoutTransactionTableProps,
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
