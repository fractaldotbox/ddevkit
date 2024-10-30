import { beforeEach, describe, expect, test } from "vitest";
import { createEAS } from "../ethers/onchain";
import { createWalletClient, custom, http } from "viem";
import { EASContractAddress } from "./onchain.test";
import { sepolia } from "viem/chains";
import {
	EAS,
	getOffchainUID,
	NO_EXPIRATION,
	Offchain,
	OffchainAttestationTypedData,
	OffchainAttestationVersion,
	ZERO_BYTES,
	ZERO_BYTES32,
} from "@ethereum-attestation-service/eas-sdk";
import { createEthersSigner } from "../ethers";
import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { encodeBytes32String, Signer } from "ethers";
import {
	SCHEMA_FIXTURE_IS_A_FRIEND,
	VOTE_SCHEMA_FIXTURE,
} from "../eas-test.fixture";
import { BY_USER } from "@/stories/fixture";
import { EIP712_NAME } from "../versions";
import { OFFCHAIN_ATTESTATION_TYPES } from "../offchain/offchain";

describe.only("offchain attestation handling/verification", () => {
	let eas: EAS;
	let offchain: Offchain;
	let signer: Signer;

	const salt = encodeBytes32String("SALT");

	const privateKey = process.env.TESTER_PRIVATE_KEY_EAS as Hex;
	const from = privateKeyToAccount(privateKey);

	const requestTemplate = {
		schema: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
		recipient: BY_USER.eas.mockReceipient.address,
		time: 1728637333n,
		expirationTime: NO_EXPIRATION,
		revocable: true,
		refUID: ZERO_BYTES32,
		data: ZERO_BYTES,
		salt,
	};

	beforeEach(async () => {
		signer = createEthersSigner(privateKey, sepolia.id);
		eas = createEAS(EASContractAddress, signer);
		offchain = await eas.getOffchain();
	});
	test("with sdk", async () => {
		const now = BigInt(Date.now());

		const { schema, recipient, revocable, expirationTime, refUID, data } =
			requestTemplate;

		const uid = getOffchainUID(
			OffchainAttestationVersion.Version2,
			schema,
			recipient,
			now,
			expirationTime,
			revocable,
			refUID,
			data,
			salt,
		);

		const offchain = await eas.getOffchain();

		const attestation = await offchain.signOffchainAttestation(
			{
				schema,
				recipient,
				time: now,
				expirationTime,
				revocable,
				refUID,
				data,
				salt,
			},
			signer,
		);
		expect(attestation.uid).toBe(uid);
		expect(
			await offchain.verifyOffchainAttestationSignature(
				await signer.getAddress(),
				attestation,
			),
		).toEqual(true);
	});

	test("with viem", async () => {
		// const { schema, recipient, revocable, expirationTime, refUID, data } =
		// 	requestTemplate;

		const offchainTypedData: OffchainAttestationTypedData = {
			version: OffchainAttestationVersion.Version2,
			...requestTemplate,
		};

		const { types, primaryType, domain } =
			OFFCHAIN_ATTESTATION_TYPES[OffchainAttestationVersion.Version2][0];

		const config = {
			version: "1.0.0",
			chainId: 115511n,
			name: EIP712_NAME,
			address: "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794",
		};

		const message = offchainTypedData;

		const typedData = {
			types,
			primaryType,
			domain,
			message,
		};

		const client = createWalletClient({
			chain: sepolia,
			transport: http(),
			account: from,
		});

		const results = await client.signTypedData(typedData as any);

		console.log("results", results);
		// const signedRequest = await this.signTypedDataRequest<
		// 	EIP712MessageTypes,
		// 	OffchainAttestationTypedData
		// >(
		// 	typedData,
		// 	{
		// 		domain: this.getDomainTypedData(),
		// 		primaryType: this.signingType.primaryType,
		// 		message: typedData,
		// 		types: this.signingType.types,
		// 	},
		// 	signer,
		// );
	});
	// TODO
	test.skip("should verify attestation onchain", async () => {});
});
