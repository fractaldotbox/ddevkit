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
import { ethers, encodeBytes32String, Signer, Signature } from "ethers";
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
import { signOffchainAttestation } from "./offchain";

describe("offchain attestation handling/verification", () => {
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
		time: 1728637333000n,
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

		console.log("attesterAddress", attesterAddress);
	});

	test.only("with sdk", async () => {
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

		console.log("sdk attestation", attestation);

		expect(attestation.uid).toBe(uid);
		expect(
			await offchain.verifyOffchainAttestationSignature(
				attesterAddress,
				attestation,
			),
		).toEqual(true);
	});

	test.only("with viem", async () => {
		const now = BigInt(Date.now());

		const { schema, recipient, revocable, expirationTime, refUID, data } =
			requestTemplate;
		const version = OffchainAttestationVersion.Version2;

		const offchainTypedData: OffchainAttestationTypedData = {
			...requestTemplate,
			time: now,
			version,
		};

		const attestation = await signOffchainAttestation(
			{
				...requestTemplate,
				time: now,
				version,
			},
			{
				chain: sepolia,
				account: from,
			},
		);

		const uidEasSdk = getOffchainUIDEasSdk(
			version,
			schema,
			recipient,
			now,
			expirationTime,
			revocable,
			refUID,
			data,
			salt,
		);

		const uid = getOffchainUID({
			...offchainTypedData,
			data: data as Hex,
			refUID: refUID as Hex,
			salt: salt as Hex,
			recipient: recipient as Address,
			version,
		});

		expect(uid).toBe(uidEasSdk);

		console.log("viem attestation", attestation);
		// sdk verification
		expect(attestation.uid).toBe(uid);

		expect(
			await offchain.verifyOffchainAttestationSignature(attesterAddress, {
				...attestation,
				domain: {
					...attestation.domain,
					chainId: BigInt(attestation.domain.chainId),
				},
				signature: Signature.from(attestation.signature),
			}),
		).toEqual(true);

		const isValid = await verifyOffchainAttestationSignature(
			attesterAddress,
			attestation,
		);

		expect(isValid).toBe(true);
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
