import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransaction } from "@/hooks/use-blockscout";
import { TransactionCardWithDetails } from "./TransactionCardWithDetails";
import { useTokenInfo } from "@/lib/domain/token/token";
import { Chain } from "viem";
import { mainnet } from "viem/chains";

export const TransactionCard = ({
    txnHash,
    chain = mainnet,
}: {
    txnHash: string;
    chain: Chain
}) => {
    const { data: transaction } = useGetTransaction(txnHash);

    // TODO
    const { data: tokenInfo } = useTokenInfo({
        chain,
        address: transaction.tokenTransfers?.[0]?.address,
    });


    if (!txnHash || !transaction) {
        return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    }

    return <TransactionCardWithDetails transaction={transaction} nativeCurrency={chain.nativeCurrency} />;
};