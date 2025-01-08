// explorer url in chainInfo.ts are pulled from  https://github.com/blockscout/chainscout/blob/main/data/chains.json
// https://www.blockscout.com/chains-and-projects

import type { Chain } from "viem";
import { BLOCKSCOUT_CHAINS_BY_ID } from "./chainInfo";

// TODO ensure treeshaking

export const getBlockscoutChainEndpoint = (chain: Chain): string => {
	const blockScoutChainExplorer =
		BLOCKSCOUT_CHAINS_BY_ID[chain.id.toString()]?.explorers?.[0];

	if (!blockScoutChainExplorer) {
		return "";
	}

	return blockScoutChainExplorer.url.replace(/\/$/, "");
};
