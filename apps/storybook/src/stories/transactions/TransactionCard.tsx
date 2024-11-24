import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransaction } from "@/hooks/use-blockscout";
import { useTokenInfo } from "@/lib/domain/token/token";
import { ExplorerEntity, createBlockExplorerUrl } from "@/lib/explorer/url";
import { Chain } from "viem";
import { mainnet } from "viem/chains";
import { useConfig } from "wagmi";
import { TransactionCardWithDetails } from "./TransactionCardWithDetails";

export const TransactionCard = ({
	txnHash,
	chain = mainnet,
}: {
	txnHash: string;
	chain: Chain;
}) => {
	const { data: transaction, isLoading } = useGetTransaction(txnHash);

	console.log("tokenInfo", transaction?.tokenTransfers?.[0]?.address);
	// TODO handle conditional hook, wait for transaction

	const config = useConfig();

	// TODO pass in extra token info
	// const { data: tokenInfo } = useTokenInfo({
	//     config,
	//     chain,
	//     address: transaction?.tokenTransfers?.[0]?.address,
	// });

	const txnUrl = createBlockExplorerUrl({
		chain,
		entity: ExplorerEntity.Transaction,
		params: {
			txnHash,
		},
	});

	if (!txnHash || !transaction) {
		return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
	}

	return (
		<TransactionCardWithDetails
			transaction={transaction}
			txnUrl={txnUrl}
			nativeCurrency={chain.nativeCurrency}
		/>
	);
};
