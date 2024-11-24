import { Address, Transaction, parseGwei, parseUnits } from "viem";
import {
	TokenTransfer,
	TransactionMeta,
} from "../domain/transaction/transaction";

const ROOT = "https://eth.blockscout.com/api/";
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

export const ENDPOINT_STRATEGIES = {
	[BlockscoutEndpoint.Address]: (params: BlockscoutEndpointParams) => {
		const { address } = params;
		return ROOT + "v1/address/" + address;
	},
	[BlockscoutEndpoint.Transaction]: (params: BlockscoutEndpointParams) => {
		const { txnHash } = params;
		return ROOT + "v2/transactions/" + txnHash;
	},
};

// TODO enum type
export const getEndpoint = (
	endpoint: BlockscoutEndpoint,
	params: BlockscoutEndpointParams,
) => {
	const strategy = ENDPOINT_STRATEGIES[endpoint];
	if (!strategy) {
		throw new Error("");
	}

	return strategy(params);
};

export const getAddressInfo = async (address: Address) => {
	const endpoint = getEndpoint(BlockscoutEndpoint.Address, { address });
	return invokeApi(endpoint);
};

export const getTransaction = async (txnHash: string) => {
	const endpoint = getEndpoint(BlockscoutEndpoint.Transaction, {
		txnHash,
	});
	return invokeApi(endpoint);
};

export const findDisplayedTxType = (transaction_types: any[]): string => {
	if (transaction_types.includes("contract_call")) {
		return "contract_call";
	}
	if (transaction_types.includes("coin_transfer")) {
		return "coin_transfer";
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
		displayedTxType: findDisplayedTxType(res.tx_types),
		value: parseUnits(res.value, res.decimals),
		tokenTransfers: res.token_transfers.map(asTokenTransfer),
	};
};
