import { describe, expect, test } from "vitest";
import {
	DelegatedAttestationVersion,
	getDomainSeparatorDefault,
	getDomainSeparatorDelegated,
	getDomainSeparatorOffchain,
} from "./typed-data";
import {
	Delegated,
	EAS,
	Offchain,
	OFFCHAIN_ATTESTATION_TYPES,
	OffchainAttestationType,
	OffchainAttestationVersion,
} from "@ethereum-attestation-service/eas-sdk";
import {
	Address,
	encodeAbiParameters,
	encodePacked,
	Hex,
	keccak256,
	parseAbiParameters,
} from "viem";
import { EAS_CONTRACT_ADDRESS } from "../abi";
import { DelegatedConfig } from "./delegated";
import { AbiCoder, toUtf8Bytes, keccak256 as keccak256Ethers } from "ethers";
import { EIP712_NAME } from "../versions";

describe("hash", () => {
	const data = {
		chainId: 11155111n,
		version: "1.0.0",
		address: "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794" as Address,
	};
	test("keccak", () => {
		const bytes = toUtf8Bytes(data.version);
		expect(keccak256(bytes)).toEqual(keccak256Ethers(bytes));
	});

	test("encoded viem", () => {
		// not encodePacked https://viem.sh/docs/ethers-migration.html
		const encoded = encodeAbiParameters(parseAbiParameters("bytes32,address"), [
			keccak256(toUtf8Bytes(data.version)),
			data.address,
		]);
		const encodedEthers = AbiCoder.defaultAbiCoder().encode(
			["bytes32", "address"],
			[keccak256(toUtf8Bytes(data.version)), data.address],
		);

		expect(encoded).toEqual(encodedEthers);
	});
});

describe("typed data", () => {
	const eas = new EAS(EAS_CONTRACT_ADDRESS);

	// TODO test.each with all versions
	test("#getDomainSeparatorDelegated", () => {
		const config: DelegatedConfig = {
			address: "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794",
			chainId: 11155111n,
			// version will be override
			version: "1.0.0",
			// domainSeparator: "domain-separator";
		};

		const domainSeparator = getDomainSeparatorDelegated(config);

		const offchain = new Delegated(config, eas);

		const domainSeparatorSdk = offchain.getDomainSeparator();

		expect(domainSeparatorSdk).toEqual(
			"0x517b89f2f19545cfb571bfd093eac675c4e8faff32260db312e3cba40bfec843",
		);

		expect(domainSeparator).toEqual(domainSeparatorSdk);
	});

	test("#getDomainSeparatorDefault", () => {
		const config = {
			version: "1.0.0",
			chainId: 115511n,
			name: EIP712_NAME,
			address: "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794",
		};

		const domainSeparator = getDomainSeparatorDefault(config);

		expect(domainSeparator).toEqual(
			"0x8506832ec2cf976656adba53bf1ed84b4f0de2c76eb9ef14044eb9007988f014",
		);
	});

	test("#getDomainSeparatorOffchain", () => {
		const config = {
			name: "a",
			version: "1.0.0",
			chainId: 115511n,
			address: "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794",
		};

		const verificationTypes = OFFCHAIN_ATTESTATION_TYPES[
			OffchainAttestationVersion.Version2
		] as OffchainAttestationType[];

		const signingType = verificationTypes[0];

		const domainSeparator = getDomainSeparatorOffchain(config, signingType);

		const offchain = new Offchain(
			config,
			OffchainAttestationVersion.Version2,
			eas,
		);

		const domainSeparatorSdk = offchain.getDomainSeparator();

		console.log("domainSeparator", domainSeparator);
		expect(domainSeparatorSdk).toEqual(
			"0x632c3721bd85744e31ec5ace6e6755b9c4b7fa734f6760a248fa7a2d19b5d521",
		);

		expect(domainSeparator).toEqual(domainSeparatorSdk);
	});
});
