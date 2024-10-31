// remove utils from from ethers and replcae with micro-eth-signer

import type {
	OffchainAttestationType,
	SignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";
import { Address, Hex, Signature, verifyMessage } from "viem";

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

/**
 * async call instead compare to sdk
 */
export const verifyOffchainAttestationSignature = (
	attester: string,
	attestation: any,
): Promise<boolean> => {
	// validate uid
	// if (attestation.uid !== Offchain.getOffchainUID(this.version, attestation)) {
	// 	return false;
	// }

	const { uid, signature, domain, version } = attestation;

	// const { verifyingContract } = domain;

	const verificationTypes =
		OFFCHAIN_ATTESTATION_TYPES[version as OffchainAttestationVersion];

	const typeCount = verificationTypes.length;

	return Promise.all(
		verificationTypes.map(async (type, index) => {
			// verify types
			// if (response.primaryType !== types.primaryType) {
			// 	throw new InvalidPrimaryType();
			//   }

			//   if (!isEqual(response.types, types.types)) {
			// 	throw new InvalidTypes();
			//   }

			//   if (attester === ZERO_ADDRESS) {
			// 	throw new InvalidAddress();
			//   }

			return verifyMessage({
				address: attester as Address,
				message: attestation,
				signature: signature as unknown as Signature,
			});
		}),
	);
};
