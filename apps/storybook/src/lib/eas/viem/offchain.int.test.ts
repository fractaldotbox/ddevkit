import { beforeEach, describe, expect, test } from "vitest";
import { createEAS } from "../ethers/onchain";
import { Address, createWalletClient, custom, http } from "viem";
import { EASContractAddress } from "./onchain.test";
import { sepolia } from "viem/chains";
import {
	EAS,
	getOffchainUID as getOffchainUIDEasSdk,
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
import {
	OFFCHAIN_ATTESTATION_TYPES,
	verifyOffchainAttestationSignature,
} from "../offchain/offchain";
import { getOffchainUID } from "../offchain-utils";

describe.only("offchain attestation handling/verification", () => {
	let eas: EAS;
	let offchain: Offchain;
	let attesterSigner: Signer;
	let attesterAddress: Address;

	const salt = encodeBytes32String("SALT") as Hex;

	const privateKey = process.env.TESTER_PRIVATE_KEY_EAS as Hex;
	const from = privateKeyToAccount(privateKey);

	const requestTemplate = {
		schema: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
		recipient: BY_USER.eas.mockReceipient.address,
		time: 1728637333n,
		expirationTime: NO_EXPIRATION,
		revocable: true,
		refUID: ZERO_BYTES32,
		data: ZERO_BYTES as Hex,
		salt,
	};

	beforeEach(async () => {
		attesterSigner = createEthersSigner(privateKey, sepolia.id);
		eas = createEAS(EASContractAddress, attesterSigner);
		offchain = await eas.getOffchain();

		attesterAddress = (await attesterSigner.getAddress()) as Address;
	});
	test("with sdk", async () => {
		const now = BigInt(Date.now());

		const { schema, recipient, revocable, expirationTime, refUID, data } =
			requestTemplate;

		const uid = getOffchainUIDEasSdk(
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
			attesterSigner,
		);
		expect(attestation.uid).toBe(uid);
		expect(
			await offchain.verifyOffchainAttestationSignature(
				attesterAddress,
				attestation,
			),
		).toEqual(true);
	});

	test.only("with viem", async () => {
		// const { schema, recipient, revocable, expirationTime, refUID, data } =
		// 	requestTemplate;

		const offchainTypedData: OffchainAttestationTypedData = {
			version: OffchainAttestationVersion.Version2,
			...requestTemplate,
		};

		const version = OffchainAttestationVersion.Version2;
		const { types, primaryType, domain } =
			OFFCHAIN_ATTESTATION_TYPES[version][0];

		const config = {
			version: "1.0.0",
			chainId: 115511n,
			name: EIP712_NAME,
			address: "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794",
		};

		// TODO chain id
		// TODO sin with contract

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

		const {
			schema,
			recipient,
			revocable,
			time,
			expirationTime,
			refUID,
			data,
			salt,
		} = requestTemplate;

		const signed = await client.signTypedData(typedData as any);
		const uid = getOffchainUID({
			...requestTemplate,
			refUID: refUID as Hex,
			recipient: recipient as Address,
			version,
		});

		const attestation = {
			version,
			uid,
			...requestTemplate,
			// ...signedRequest,
		};

		console.log("results", attestation);

		const isValid = await verifyOffchainAttestationSignature(
			attesterAddress,
			attestation,
		);

		expect(isValid).toBe(true);

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
	test.skip("should verify attestation onchain", async () => {
		// await this.eas.contract.attest.staticCall(
		// 	{
		// 	  schema,
		// 	  data: { recipient, expirationTime, revocable, refUID: params.refUID || ZERO_BYTES32, data, value: 0 }
		// 	},
		// 	{ from: signer }
		//   );
	});
});
