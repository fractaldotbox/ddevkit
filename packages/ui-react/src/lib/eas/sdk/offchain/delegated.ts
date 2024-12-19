import omit from "lodash/omit";
import semver from "semver";
import {
	EIP712MessageTypes,
	EIP712Params,
	EIP712Response,
	EIP712Types,
	TypeDataSigner,
	// TypedDataHandler,
} from "./typed-data-handler";
import { EIP712_NAME, EIP712_VERSIONS } from "./versions";

enum DelegatedAttestationVersion {
	Legacy = 0,
	Version1 = 1,
	Version2 = 2,
}

interface DelegatedAttestationType extends EIP712Types<EIP712MessageTypes> {
	typedSignature: string;
}

const DELEGATED_ATTESTATION_TYPES: Record<
	DelegatedAttestationVersion,
	DelegatedAttestationType
> = {
	[DelegatedAttestationVersion.Legacy]: {
		typedSignature:
			"Attest(bytes32 schema,address recipient,uint64 expirationTime,bool revocable,bytes32 refUID,bytes data,uint256 nonce)",
		primaryType: "Attest",
		types: {
			Attest: [
				{ name: "schema", type: "bytes32" },
				{ name: "recipient", type: "address" },
				{ name: "expirationTime", type: "uint64" },
				{ name: "revocable", type: "bool" },
				{ name: "refUID", type: "bytes32" },
				{ name: "data", type: "bytes" },
				{ name: "nonce", type: "uint256" },
			],
		},
	},
	[DelegatedAttestationVersion.Version1]: {
		typedSignature:
			"Attest(bytes32 schema,address recipient,uint64 expirationTime,bool revocable,bytes32 refUID,bytes data,uint256 value,uint256 nonce,uint64 deadline)",
		primaryType: "Attest",
		types: {
			Attest: [
				{ name: "schema", type: "bytes32" },
				{ name: "recipient", type: "address" },
				{ name: "expirationTime", type: "uint64" },
				{ name: "revocable", type: "bool" },
				{ name: "refUID", type: "bytes32" },
				{ name: "data", type: "bytes" },
				{ name: "value", type: "uint256" },
				{ name: "nonce", type: "uint256" },
				{ name: "deadline", type: "uint64" },
			],
		},
	},
	[DelegatedAttestationVersion.Version2]: {
		typedSignature:
			"Attest(address attester,bytes32 schema,address recipient,uint64 expirationTime,bool revocable,bytes32 refUID,bytes data,uint256 value,uint256 nonce,uint64 deadline)",
		primaryType: "Attest",
		types: {
			Attest: [
				{ name: "attester", type: "address" },
				{ name: "schema", type: "bytes32" },
				{ name: "recipient", type: "address" },
				{ name: "expirationTime", type: "uint64" },
				{ name: "revocable", type: "bool" },
				{ name: "refUID", type: "bytes32" },
				{ name: "data", type: "bytes" },
				{ name: "value", type: "uint256" },
				{ name: "nonce", type: "uint256" },
				{ name: "deadline", type: "uint64" },
			],
		},
	},
};

const DELEGATED_REVOCATION_TYPES: Record<
	DelegatedAttestationVersion,
	DelegatedAttestationType
> = {
	[DelegatedAttestationVersion.Legacy]: {
		typedSignature: "Revoke(bytes32 schema,bytes32 uid,uint256 nonce)",
		primaryType: "Revoke",
		types: {
			Revoke: [
				{ name: "schema", type: "bytes32" },
				{ name: "uid", type: "bytes32" },
				{ name: "nonce", type: "uint256" },
			],
		},
	},
	[DelegatedAttestationVersion.Version1]: {
		typedSignature:
			"Revoke(bytes32 schema,bytes32 uid,uint256 value,uint256 nonce,uint64 deadline)",
		primaryType: "Revoke",
		types: {
			Revoke: [
				{ name: "schema", type: "bytes32" },
				{ name: "uid", type: "bytes32" },
				{ name: "value", type: "uint256" },
				{ name: "nonce", type: "uint256" },
				{ name: "deadline", type: "uint64" },
			],
		},
	},
	[DelegatedAttestationVersion.Version2]: {
		typedSignature:
			"Revoke(address revoker,bytes32 schema,bytes32 uid,uint256 value,uint256 nonce,uint64 deadline)",
		primaryType: "Revoke",
		types: {
			Revoke: [
				{ name: "revoker", type: "address" },
				{ name: "schema", type: "bytes32" },
				{ name: "uid", type: "bytes32" },
				{ name: "value", type: "uint256" },
				{ name: "nonce", type: "uint256" },
				{ name: "deadline", type: "uint64" },
			],
		},
	},
};

export type EIP712AttestationParams = EIP712Params & {
	schema: string;
	recipient: string;
	expirationTime: bigint;
	revocable: boolean;
	refUID: string;
	data: string;
	value: bigint;
	deadline: bigint;
};

interface EIP712FullAttestationParams extends EIP712AttestationParams {
	attester: string;
}

export type EIP712RevocationParams = EIP712Params & {
	schema: string;
	uid: string;
	value: bigint;
	deadline: bigint;
};

interface EIP712FullRevocationParams extends EIP712RevocationParams {
	revoker: string;
}

export interface DelegatedConfig {
	address: string;
	chainId: bigint;
	version?: string;
	domainSeparator?: string;
}
