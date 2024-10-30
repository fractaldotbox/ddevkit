// remove utils from from ethers and replcae with micro-eth-signer

import type { OffchainAttestationType } from "@ethereum-attestation-service/eas-sdk";

export type EIP712Params = {
	nonce?: bigint;
};

export enum OffchainAttestationVersion {
	Legacy = 0,
	Version1 = 1,
	Version2 = 2,
}
export type OffchainAttestationParams = {
	schema: string;
	recipient: string;
	time: bigint;
	expirationTime: bigint;
	revocable: boolean;
	refUID: string;
	data: string;
	salt?: string;
} & Partial<EIP712Params>;

export type OffchainAttestationTypedData = OffchainAttestationParams & {
	version: OffchainAttestationVersion;
};

export const OFFCHAIN_ATTESTATION_TYPES: Record<
	OffchainAttestationVersion,
	OffchainAttestationType[]
> = {
	[OffchainAttestationVersion.Legacy]: [
		{
			domain: "EAS Attestation",
			primaryType: "Attestation",
			types: {
				Attestation: [
					{ name: "schema", type: "bytes32" },
					{ name: "recipient", type: "address" },
					{ name: "time", type: "uint64" },
					{ name: "expirationTime", type: "uint64" },
					{ name: "revocable", type: "bool" },
					{ name: "refUID", type: "bytes32" },
					{ name: "data", type: "bytes" },
				],
			},
		},
		{
			domain: "EAS Attestation",
			primaryType: "Attestation",
			types: {
				Attest: [
					{ name: "schema", type: "bytes32" },
					{ name: "recipient", type: "address" },
					{ name: "time", type: "uint64" },
					{ name: "expirationTime", type: "uint64" },
					{ name: "revocable", type: "bool" },
					{ name: "refUID", type: "bytes32" },
					{ name: "data", type: "bytes" },
				],
			},
		},
		{
			domain: "EAS Attestation",
			primaryType: "Attest",
			types: {
				Attest: [
					{ name: "schema", type: "bytes32" },
					{ name: "recipient", type: "address" },
					{ name: "time", type: "uint64" },
					{ name: "expirationTime", type: "uint64" },
					{ name: "revocable", type: "bool" },
					{ name: "refUID", type: "bytes32" },
					{ name: "data", type: "bytes" },
				],
			},
		},
	],
	[OffchainAttestationVersion.Version1]: [
		{
			domain: "EAS Attestation",
			primaryType: "Attest",
			types: {
				Attest: [
					{ name: "version", type: "uint16" },
					{ name: "schema", type: "bytes32" },
					{ name: "recipient", type: "address" },
					{ name: "time", type: "uint64" },
					{ name: "expirationTime", type: "uint64" },
					{ name: "revocable", type: "bool" },
					{ name: "refUID", type: "bytes32" },
					{ name: "data", type: "bytes" },
				],
			},
		},
	],
	[OffchainAttestationVersion.Version2]: [
		{
			domain: "EAS Attestation",
			primaryType: "Attest",
			types: {
				Attest: [
					{ name: "version", type: "uint16" },
					{ name: "schema", type: "bytes32" },
					{ name: "recipient", type: "address" },
					{ name: "time", type: "uint64" },
					{ name: "expirationTime", type: "uint64" },
					{ name: "revocable", type: "bool" },
					{ name: "refUID", type: "bytes32" },
					{ name: "data", type: "bytes" },
					{ name: "salt", type: "bytes32" },
				],
			},
		},
	],
};
