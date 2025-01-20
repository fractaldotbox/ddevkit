import { type Address, type Chain, erc20Abi } from "viem";
import { mainnet } from "viem/chains";
import { useConfig } from "wagmi";
import { useTokenInfo } from "./token";
import { TokenChipWithInfo } from "./token-chip-with-info";

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
	const config = useConfig();
	const { data } = useTokenInfo({
		address,
		chain,
		config,
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
