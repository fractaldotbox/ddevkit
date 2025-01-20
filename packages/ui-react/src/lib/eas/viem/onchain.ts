// Model as action
// https://github.com/wevm/viem/blob/main/src/actions/ens/getEnsName.ts

import {
	http,
	Account,
	Chain,
	Client,
	type Hex,
	type ReadContractParameters,
	TransactionReceipt,
	Transport,
	type WalletClient,
	createPublicClient,
} from "viem";
import {
	simulateContract,
	waitForTransactionReceipt,
	writeContract,
} from "viem/actions";
import { sepolia } from "viem/chains";
import { EAS_ABI, EAS_CONTRACT_ADDRESS } from "#lib/eas/abi";
import { getUIDsFromAttestReceipt } from "#lib/eas/events";
import type { RevocationRequest } from "#lib/eas/request";
import type { SchemaItem } from "#lib/eas/sdk/eas";

// TODO align on offchain
export interface AttestationRequestData {
	recipient: string;
	data: SchemaItem[];
	expirationTime?: bigint;
	revocable?: boolean;
	refUID?: string;
	value?: bigint;
	time: bigint;
	salt: Hex;
}

export interface AttestationRequest {
	schema: string;
	data: AttestationRequestData;
}

// strategy action pattern by signature type
export const makeOnchainAttestation = async (
	client: WalletClient,
	request: AttestationRequest,
) => {
	// TODO defaults

	const { request: writeRequest } = await simulateContract(client, {
		account: client.account,
		address: EAS_CONTRACT_ADDRESS,
		abi: EAS_ABI,
		functionName: "attest",
		args: [request],
	});

	console.log("writeRequest", writeRequest);
	const hash = await writeContract(client, writeRequest);

	const txnReceipt = await waitForTransactionReceipt(client, {
		hash,
	});

	console.log("txn results", txnReceipt);

	const uids = getUIDsFromAttestReceipt(txnReceipt);
	return {
		uids,
		txnReceipt,
	};
};

export type RevokeParameters = Pick<
	ReadContractParameters,
	"blockNumber" | "blockTag"
> &
	RevocationRequest;

// TODO type error at write request with generics  WalletClient<Transport, chain, account>  <chain extends Chain | undefined, account extends Account

export const revoke = async (
	client: WalletClient,
	request: RevocationRequest,
) => {
	const {
		schema,
		data: { uid, value = 0n },
	} = request;

	const publicClient = createPublicClient({
		chain: client.chain,
		transport: http(),
	});

	const { request: writeRequest } = await simulateContract(publicClient, {
		account: client.account,
		address: EAS_CONTRACT_ADDRESS,
		abi: EAS_ABI,
		functionName: "revoke",
		args: [{ schema, data: { uid, value } }],
	});

	// type error to fix
	return client.writeContract(writeRequest);
};

const revokeOffchain = (uid: string) => {};

export const getAttestation = () => {};
