import { AddressOrEns } from "@/hooks/use-efp-api";
import { Address } from "viem";

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

// TODO enum type
export const getEndpoint = (address: Address, transactionsHash?: string) => {
	let root = "https://eth.blockscout.com/api";
	if (transactionsHash) {
		return root + "/v2/transactions/" + transactionsHash;
	}
	return root + "/v1/addresses/" + address;
};

export const getAddressInfo = async (address: Address) => {
	const endpoint = getEndpoint(address);
	console.log("endpoint", endpoint);
	return invokeApi(endpoint);
};

export const getAddressTransactions = async (
	address: Address,
	txnHash: string,
) => {
	const endpoint = getEndpoint(address, txnHash);
	console.log("endpoint", endpoint);
	return invokeApi(endpoint);
};
