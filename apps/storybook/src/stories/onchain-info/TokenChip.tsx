import { useTokenInfo } from "@/lib/token/token";
import { Address, Chain, erc20Abi } from "viem";
import { mainnet } from "viem/chains";
import { TokenChipWithInfo } from "./TokenChipWithInfo";

export type TokenChipProps = {
	className?: string;
	amount?: bigint;
	chain: Chain;
	address?: Address;
};

enum ChainDataProvider {
	// wagmi rpc
	Rpc = "rpc",
	BlockscoutApi = "blockscout",
}

export const TokenChip = ({
	address,
	amount,
	chain,
	className,
}: TokenChipProps) => {
	const { data } = useTokenInfo({
		address,
		chain,
	});

	if (!data) {
		return null;
	}

	return (
		<TokenChipWithInfo
			amount={amount}
			decimals={data.decimals}
			imageUrl={data.imageUrl}
			name={data.name}
			symbol={data.symbol}
			{...data}
		/>
	);
};
