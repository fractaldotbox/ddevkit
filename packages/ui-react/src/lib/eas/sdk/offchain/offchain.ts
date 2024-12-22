// remove utils from from ethers and replcae with micro-eth-signer

import type {
	OffchainAttestationType,
	SignedOffchainAttestation,
} from "@ethereum-attestation-service/eas-sdk";
import { ZERO_ADDRESS } from "@geist/ui-react/lib/constants";
import { Address, verifyMessage, verifyTypedData } from "viem";
import { isDeepEqual } from "#lib/shadcn/utils";
import { getOffchainUID } from "./offchain-utils";
import {
	InvalidAddress,
	InvalidPrimaryType,
	InvalidTypes,
} from "./typed-data-handler";

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
export const verifyOffchainAttestationSignature = async (
	attesterAddress: Address,
	attestation: any,
): Promise<boolean> => {
	const { uid, message, version } = attestation;

	if (uid !== getOffchainUID(message)) {
		return false;
	}

	const verificationTypes =
		OFFCHAIN_ATTESTATION_TYPES[version as OffchainAttestationVersion];

	const results = await Promise.all(
		verificationTypes.map(async (type) => {
			const { types, primaryType } = type;

			if (attestation.primaryType !== primaryType) {
				throw new InvalidPrimaryType();
			}

			if (!isDeepEqual(attestation.types, types)) {
				throw new InvalidTypes();
			}

			if (attesterAddress === ZERO_ADDRESS) {
				throw new InvalidAddress();
			}
			return verifyTypedData({
				...attestation,
				address: attesterAddress,
			});
		}),
	);

	return results.every((isValid) => isValid);
};
