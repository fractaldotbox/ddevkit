import { asTransactionMeta, getTransaction } from "@/lib/blockscout/api";
import { TransactionMeta } from "@/lib/domain/transaction/transaction";
import { useQuery } from "@tanstack/react-query";
import { Address, Transaction } from "viem";

export const CACHE_KEY = "blockscout";

export const useGetTransaction = (txnHash: string) => {
	return useQuery<TransactionMeta>({
		queryKey: [`${CACHE_KEY}.transaction`, txnHash],
		queryFn: async () => {
			const results = await getTransaction(txnHash);
			return asTransactionMeta(results);
		},
	});
};
