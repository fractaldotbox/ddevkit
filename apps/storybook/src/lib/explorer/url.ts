import { Args } from "@storybook/react";
import { getBlock } from "viem/actions";
import { Chain, filecoin, filecoinCalibration, mainnet } from "viem/chains";
import { getBlockscoutChainEndpoint } from "../blockscout/chain";

export enum Explorer {
	Blockscout = "blockscout",
	Etherscan = "etherscan",
	Filfox = "filfox",
	Filscan = "filscan",
}

export type ExplorerParams = {
	address?: string;
	txnHash?: string;
} & { [key: string]: any };

export enum ExplorerEntity {
	Block = "block",
	Transaction = "transaction",
	Address = "address",
	Token = "token",
}

/**
 * Model after https://eips.ethereum.org/EIPS/eip-3091
 */

export type CreateExplorerUrl = (
	createUrlArgs: CreateBlockExplorerUrlArgs,
) => string;

export type ExplorerConfig = {
	name: Explorer;
	overrideStrategies?: {
		[chainId: number]: CreateExplorerUrl;
		default?: CreateExplorerUrl;
	};
	locale?: string;
};

export const createBlockExplorerUrlWithEip3091 = (
	endpoint: string,
	entity: ExplorerEntity,
	params: ExplorerParams,
) => {
	if (entity === ExplorerEntity.Transaction) {
		return endpoint + "/tx/" + params.txnHash;
	}
	return endpoint + "/address/" + params.address;
};

export type CreateBlockExplorerUrlArgs = {
	chain: Chain;
	entity: ExplorerEntity;
	params: ExplorerParams;
};

/**
 * inefficient implementation, will optimize later with currying
 *
 * Currying as generally we don't need run-time dynamic choice of explorer but a handy api to create corrs. urls
 * run-time params couold be locale
 *
 * viem blockExplorers, or any obj-based config cannot handle locale or more complicated logic
 * single override, functional config to simplify the logic here
 * we might want e.g. filecoin specific chain with blockscout for the rest
 *
 * TODO figure out best way to inject overrideBlockExplorers / overrideStrategies after we have more non standard examples
 */

export const blockExplorerUrlFactory = ({
	chain,
	config,
}: {
	chain: Chain;
	config?: ExplorerConfig;
}) => {
	const name = config?.name || Explorer.Blockscout;

	const strategy =
		config?.overrideStrategies?.[chain.id] ||
		config?.overrideStrategies?.default;

	if (strategy) {
		return (createUrlArgs: CreateBlockExplorerUrlArgs) =>
			strategy({
				...createUrlArgs,
				params: {
					...createUrlArgs.params,
					locale: config?.locale,
				},
			});
	}
	const blockExplorer =
		chain.blockExplorers?.[name] || chain.blockExplorers?.default;

	return (createUrlArgs: CreateBlockExplorerUrlArgs) => {
		const { entity, params } = createUrlArgs;

		return createBlockExplorerUrlWithEip3091(
			blockExplorer?.url || "",
			entity,
			params,
		);
	};
};
