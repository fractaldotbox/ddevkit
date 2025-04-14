import type {
	TokenTransfer,
	TransactionMeta,
} from "@geist/domain/transaction/transaction";
import { type Address, parseUnits } from "viem";
import * as chains from "viem/chains";

const chainIdToApiRoot: any = {
	[chains.mainnet.id]: "https://eth.blockscout.com/api/",
	[chains.optimism.id]: "https://optimism.blockscout.com/api/",
};

export const invokeApi = async (endpoint: string, body?: any) => {
	return fetch(endpoint, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => {
		return res.json();
	});
};

// TODO better pairing types
export enum BlockscoutEndpoint {
	Transaction = "transaction",
	Address = "address",
}
export interface BlockscoutEndpointParams {
	address?: Address;
	txnHash?: string;
}

export const getEndpointStrategy = (chainId?: number) => ({
	[BlockscoutEndpoint.Address]: (params: BlockscoutEndpointParams) => {
		const { address } = params;
		return (
			chainIdToApiRoot[chainId || chains.mainnet.id] + "v1/address/" + address
		);
	},
	[BlockscoutEndpoint.Transaction]: (params: BlockscoutEndpointParams) => {
		const { txnHash } = params;
		return (
			chainIdToApiRoot[chainId || chains.mainnet.id] +
			"v2/transactions/" +
			txnHash
		);
	},
});

// TODO enum type
export const getEndpoint = (
	endpoint: BlockscoutEndpoint,
	params: BlockscoutEndpointParams,
	chainId = 1,
) => {
	const strategy = getEndpointStrategy(chainId)[endpoint];
	if (!strategy) {
		throw new Error("");
	}

	return strategy(params);
};

export const getAddressInfo = async (address: Address, chainId?: number) => {
	const endpoint = getEndpoint(
		BlockscoutEndpoint.Address,
		{ address },
		chainId,
	);
	return invokeApi(endpoint);
};

export const getTransaction = async (txnHash: string, chainId?: number) => {
	const endpoint = getEndpoint(
		BlockscoutEndpoint.Transaction,
		{
			txnHash,
		},
		chainId,
	);
	return invokeApi(endpoint);
};

export interface GetTxnByFilterQuery {
	filter?: string;

	// maybe have more types
	type?: (
		| "token_transfer"
		| "contract_creation"
		| "contract_call"
		| "coin_transfer"
		| "token_creation"
	)[];
	method?: string;
	chainId?: number;
}

export const getTxnsByFilter = async ({
	filter,
	type,
	method,
	chainId = 1,
}: GetTxnByFilterQuery) => {
	const queryString = new URLSearchParams({
		...(filter && { filter }),
		...(method && { method }),
		...(type && { type: type.join(",") }),
	});
	const endpoint = `${chainIdToApiRoot[chainId || chains.mainnet.id]}v2/transactions?${queryString.toString()}`;
	return await invokeApi(endpoint);
};

export const findDisplayedTxType = (transactionTypes: any[] = []): string => {
	if (transactionTypes.includes("contract_call")) {
		return "contract_call";
	}
	if (transactionTypes.includes("coin_transfer")) {
		return "coin_transfer";
	}
	if (transactionTypes.includes("token_transfer")) {
		return "token_transfer";
	}
	return "native_transfer";
};

export const asTokenTransfer = (transfer: any): TokenTransfer => {
	const { token } = transfer;
	return {
		...token,
		// imageUrl: '',
		name: transfer.token.name,
		amount: parseUnits(transfer.total.value, transfer.total.decimals),
	};
};

/**
 *
 * Requires chain specific info  for native currency symbol
 *
 */
export const asTransactionMeta = (res: any): TransactionMeta => {
	return {
		hash: res.hash,
		blockHash: res.blockHash,
		from: res.from.hash as Address,
		to: res.to.hash as Address,
		isSuccess: res.success,
		displayedTxType: findDisplayedTxType(res.transaction_types),
		value: parseUnits(res.value, res.decimals),
		tokenTransfers: (res.token_transfers || []).map(asTokenTransfer),
		gas: res.gas_used,
		blockNumber: res.block_number,
	};
};
