import {
	TransactionMeta,
	asTransaction,
	getTransaction,
} from "@/lib/blockscout/api";
import { useQuery } from "@tanstack/react-query";
import { Address, Transaction } from "viem";

export const CACHE_KEY = "blockscout";

export const useGetTransaction = (txnHash: string) => {
	return useQuery<TransactionMeta>({
		queryKey: [`${CACHE_KEY}.transaction`, txnHash],
		queryFn: async () => {
			const results = await getTransaction(txnHash);
			console.log("results", results);
			return asTransaction(results);
		},
	});
};
