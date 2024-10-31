import {
	type AttestationShareablePackageObject,
	CompactAttestationShareablePackageObject,
	EIP712MessageTypes,
	OffchainAttestationVersion,
} from "@ethereum-attestation-service/eas-sdk";
import { base64 } from "@scure/base";
import { zlibSync } from "fflate";
import { stringifyWithBigInt } from "./util";
import { ZERO_ADDRESS, ZERO_HASH } from "../constants";
import { OFFCHAIN_ATTESTATION_TYPES } from "./offchain/offchain";
import {
	Address,
	encodeAbiParameters,
	Hex,
	keccak256,
	parseAbiParameters,
	stringToHex,
} from "viem";

/**
 *
 * Key changes:
 *
 * - fflate over pako for compression as it's both faster and smaller (tree-shakable)
 *  - it's backward compatabile as both align with zlib spec and current pako settings can decrypt fflate's output and vice versa
 *   - given both use zlib defaults strategy. however, output are not the same
 * - in theory give fixed schema, we could apply dictionary to improve compression/decompression but that will be breaking changes
 * - At browsers, CompressionStream can be used but that runs inside worker.
 * - for base64, @scure/base is a secure, fast, tree-shakable, sub-dependency of viem and simplify compatability, although we could use window.atob at browser and Buffer at node
 * - serialize bigint into hex could improve compression but that will be breaking change
 */

export const zipAndEncodeToBase64 = (
	pkg: AttestationShareablePackageObject,
) => {
	const compacted = compactOffchainAttestationPackage(pkg);

	const encoded = stringifyWithBigInt(compacted);
	const encodedBytes = new TextEncoder().encode(encoded);
	const zipped = zlibSync(encodedBytes, { level: 9 });

	return base64.encode(zipped);
};

export const createOffchainURL = (pkg: AttestationShareablePackageObject) => {
	const base64 = zipAndEncodeToBase64(pkg);
	return `/offchain/url/#attestation=${encodeURIComponent(base64)}`;
};

export const compactOffchainAttestationPackage = (
	pkg: AttestationShareablePackageObject,
): CompactAttestationShareablePackageObject => {
	const { signer } = pkg;
	let { sig } = pkg;

	return [
		sig.domain.version,
		sig.domain.chainId,
		sig.domain.verifyingContract,
		sig.signature.r,
		sig.signature.s,
		sig.signature.v,
		signer,
		sig.uid,
		sig.message.schema,
		sig.message.recipient === ZERO_ADDRESS ? "0" : sig.message.recipient,
		Number(sig.message.time),
		Number(sig.message.expirationTime),
		sig.message.refUID === ZERO_HASH ? "0" : sig.message.refUID,
		sig.message.revocable,
		sig.message.data,
		0,
		sig.message.version,
		sig.message.salt,
	];
};

export const uncompactOffchainAttestationPackage = (
	compacted: CompactAttestationShareablePackageObject,
): AttestationShareablePackageObject => {
	// ignore version and avoid duplication with offchain.ts
	const version: OffchainAttestationVersion = compacted[16]
		? compacted[16]
		: OffchainAttestationVersion.Version2;

	const attestTypes: EIP712MessageTypes =
		OFFCHAIN_ATTESTATION_TYPES[version][0].types;

	return {
		sig: {
			version,
			domain: {
				name: "EAS Attestation",
				version: compacted[0],
				chainId: BigInt(compacted[1]),
				verifyingContract: compacted[2],
			},
			primaryType:
				version === OffchainAttestationVersion.Legacy
					? "Attestation"
					: "Attest",
			types: attestTypes,
			signature: {
				r: compacted[3],
				s: compacted[4],
				v: compacted[5],
			},
			uid: compacted[7],
			message: {
				version,
				schema: compacted[8],
				recipient: compacted[9] === "0" ? ZERO_ADDRESS : compacted[9],
				time: BigInt(compacted[10]),
				expirationTime: BigInt(compacted[11]),
				refUID: compacted[12] === "0" ? ZERO_HASH : compacted[12],
				revocable: compacted[13],
				data: compacted[14],
				salt: compacted[17],
			},
		},
		signer: compacted[6],
	};
};

export const getOffchainUID = (params: {
	version: number;
	schema: string;
	recipient: Address;
	time: bigint;
	expirationTime: bigint;
	revocable: boolean;
	refUID: Hex;
	data: Hex;
	salt: Hex;
}) => {
	const {
		version,
		schema,
		recipient,
		time,
		expirationTime,
		revocable,
		refUID,
		data,
		salt,
	} = params;
	// TODO version switch
	// TODO reuse abi
	return keccak256(
		encodeAbiParameters(
			parseAbiParameters(
				"uint16, bytes, address, address, uint64, uint64, bool, bytes32, bytes, bytes32, uint32",
			),
			[
				version,
				stringToHex(schema),
				recipient,
				ZERO_ADDRESS,
				time,
				expirationTime,
				revocable,
				refUID,
				data,
				salt,
				0,
			],
		),
	);
};
