// Model as action
// https://github.com/wevm/viem/blob/main/src/actions/ens/getEnsName.ts

import {
	Account,
	createPublicClient,
	createWalletClient,
	http,
	parseEventLogs,
	TransactionReceipt,
} from "viem";
import { writeContract } from "viem/actions";
import { EAS_ABI, EAS_CONTRACT_ADDRESS } from "./abi";
import { sepolia } from "viem/chains";
import { getUIDsFromAttestReceipt } from "./events";

export interface AttestationRequestData {
	recipient: string;
	data: string;
	expirationTime?: bigint;
	revocable?: boolean;
	refUID?: string;
	value?: bigint;
}

export interface AttestationRequest {
	schema: string;
	data: AttestationRequestData;
}

// strategy action pattern by signature type
export const createAttestation = async (
	request: AttestationRequest,
	{
		account,
	}: {
		account: Account;
	},
) => {
	// TODO defaults

	const publicClient = createPublicClient({
		chain: sepolia,
		transport: http(),
	});

	const walletClient = createWalletClient({
		chain: sepolia,
		transport: http(),
		account,
	});

	const { request: writeRequest } = await publicClient.simulateContract({
		account,
		address: EAS_CONTRACT_ADDRESS,
		abi: EAS_ABI,
		functionName: "attest",
		args: [request],
	});

	console.log("writeRequest", writeRequest);
	const hash = await writeContract(walletClient, writeRequest);

	const txnReceipt = await publicClient.waitForTransactionReceipt({
		hash,
	});

	console.log("txn results", txnReceipt);

	const uids = getUIDsFromAttestReceipt(txnReceipt);
	return {
		uids,
		txnReceipt,
	};
};

const revoke = (request: RevocationRequest) => {};

const revokeOffchain = (uid: string) => {};

export const getAttestation = () => {};
