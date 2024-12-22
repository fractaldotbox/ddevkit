import { Chain } from "viem";
import { mainnet } from "viem/chains";
import { useConfig } from "wagmi";
import { Skeleton } from "#components/shadcn/skeleton";
import { useGetTransaction } from "#hooks/data/use-blockscout";
// import { useTokenInfo } from "@geist/domain/token/token";
import { ExplorerEntity, blockExplorerUrlFactory } from "#lib/explorer/url";
import { TransactionCardWithDetails } from "./transaction-card-with-details";

export const TransactionCard = ({
	txnHash,
	chain = mainnet,
}: {
	txnHash: string;
	chain: Chain;
}) => {
	const { data: transaction, isLoading } = useGetTransaction(txnHash);

	const config = useConfig();

	// TODO pass in extra token info
	// const { data: tokenInfo } = useTokenInfo({
	//     config,
	//     chain,
	//     address: transaction?.tokenTransfers?.[0]?.address,
	// });

	const createTxnUrl = blockExplorerUrlFactory({
		chain,
	});

	const txnUrl = createTxnUrl({
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
