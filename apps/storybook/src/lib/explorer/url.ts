import { getBlock } from "viem/actions";
import { Chain, filecoin, filecoinCalibration, mainnet } from "viem/chains";
import { getBlockscoutChainEndpoint } from "../blockscout/chain";

export enum Explorer {
	Blockscout = "blockscout",
	Etherscan = "etherscan",
	Filfox = "filfox",
}

export const createFilecoinFilfoxAddressUrl = (
	address: string,
	chainId: number,
) => {
	if (chainId === filecoinCalibration.id) {
		return "https://calibration.filfox.info/en/address/";
	}
	return "https://filfox.info/en/address/" + address;
};

export const createBlockscoutUrl = (
	chain: Chain,
	entity: ExplorerEntity,
	params: ExplorerParams,
) => {
	const endpoint = getBlockscoutChainEndpoint(chain);
	if (entity === ExplorerEntity.Transaction) {
		return `${endpoint}tx/${params.txnHash}`;
	}
	return `${endpoint}address/${params.address}`;
};

export type ExplorerParams = {
	address?: string;
	txnHash?: string;
};

export enum ExplorerEntity {
	Block = "block",
	Transaction = "transaction",
	Address = "address",
	Token = "token",
}

/**
 * Model after https://eips.ethereum.org/EIPS/eip-3091
 */

export const createBlockExplorerUrl = ({
	chain,
	entity,
	params,
	explorer = "default",
}: {
	chain: Chain;
	entity: ExplorerEntity;
	params: ExplorerParams;
	explorer?: string;
}) => {
	if (explorer === Explorer.Blockscout) {
		return createBlockscoutUrl(chain, entity, params);
	}
	// if (explorer === Explorer.Filfox) {
	// 	return createFilecoinFilfoxAddressUrl(address, chain.id);
	// }
	const blockExplorer =
		chain.blockExplorers?.[explorer] || chain.blockExplorers?.default;

	if (blockExplorer) {
		if (entity === ExplorerEntity.Transaction) {
			return blockExplorer.url + "/tx/" + params.txnHash;
		}
		return blockExplorer.url + "/address/" + params.address;
	}
	// TODO identify chains
	return "";
};
