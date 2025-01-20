import type { Chain } from "viem";
import { optimism } from "viem/chains";

// https://github.com/trustwallet/assets
export const asTrustWalletChainName = (chain: Chain) => {
	return (
		{
			[optimism.id]: "optimism",
		}[chain.id] || chain.name
	).toLowerCase();
};
