import { http, Account, Address, Chain, Hex, createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import {
	OFFCHAIN_ATTESTATION_TYPES,
	OffchainAttestationTypedData,
	OffchainAttestationVersion,
} from "../sdk/offchain/offchain";
import { getOffchainUID } from "../sdk/offchain/offchain-utils";

export interface OffchainAttestationParams {
	schema: string;
	recipient: string;
	time: bigint;
	expirationTime: bigint;
	revocable: boolean;
	refUID: string;
	data: string;
	salt?: string;
	version: OffchainAttestationVersion;
}

export const signOffchainAttestation = async (
	request: OffchainAttestationParams,
	{
		chain,
		account,
	}: {
		chain: Chain;
		account: Account;
	},
) => {
	const offchainTypedData: OffchainAttestationTypedData = {
		...request,
	};

	const { version, data, refUID, salt, recipient } = request;

	console.log("request", request);
	const {
		types,
		primaryType,
		domain: domainName,
	} = OFFCHAIN_ATTESTATION_TYPES[version][0]!;

	const domain = {
		name: domainName,
		version: "0.26",
		chainId: chain.id,
		verifyingContract: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e" as Hex,
	};

	const message = offchainTypedData;

	const typedData = {
		// must be explicit
		account,
		types,
		primaryType,
		domain,
		message,
	};

	console.log("sign typed data", typedData);

	const client = createWalletClient({
		chain,
		transport: http(),
		account,
	});

	const signature = await client.signTypedData({
		...typedData,
	});

	const uid = getOffchainUID({
		...offchainTypedData,
		data: data as Hex,
		refUID: refUID as Hex,
		salt: salt as Hex,
		recipient: recipient as Address,
		version,
	});

	const attestation = {
		domain,
		message: {
			...typedData.message,
		},
		primaryType,
		types,
		version,
		uid,
		signature,
	};

	console.log("viem attestation", attestation);
	return attestation;
};
