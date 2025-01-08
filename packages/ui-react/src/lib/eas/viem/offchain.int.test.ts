import {
	EAS,
	NO_EXPIRATION,
	Offchain,
	OffchainAttestationTypedData,
	OffchainAttestationVersion,
	ZERO_BYTES,
	ZERO_BYTES32,
	getOffchainUID as getOffchainUIDEasSdk,
} from "@ethereum-attestation-service/eas-sdk";
import config from "@geist/domain/config";
import { BY_USER } from "@geist/domain/user.fixture";
import { Signature, Signer, encodeBytes32String, ethers } from "ethers";
import { http, Address, createWalletClient, custom, zeroHash } from "viem";
import type { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { optimismSepolia, sepolia } from "viem/chains";
import { beforeEach, describe, expect, test } from "vitest";
import { SCHEMA_BY_NAME } from "#lib/eas/attest.fixture";
import { createEAS } from "#lib/eas/sdk/eas";
import {
	OFFCHAIN_ATTESTATION_TYPES,
	verifyOffchainAttestationSignature,
} from "#lib/eas/sdk/offchain/offchain";
import { getOffchainUID } from "#lib/eas/sdk/offchain/offchain-utils";
import { signOffchainAttestation } from "#lib/eas/viem/offchain";
import { createTestEthersSigner } from "#lib/test-utils-isomorphic";

const chain = sepolia;
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// TODO test on optimism sepolia
describe.skip(
	"offchain attestation handling/verification",
	{
		timeout: 5 * 60 * 1000,
	},
	() => {
		let eas: EAS;
		let attesterSigner: Signer;
		let attesterAddress: Address;

		const salt = encodeBytes32String("SALT") as Hex;

		const privateKey = config.test.eas.privateKey as Hex;
		const from = privateKeyToAccount(privateKey);

		const requestTemplate = {
			schema: SCHEMA_BY_NAME.MET_IRL.byChain[chain.id].index.toString(),
			recipient: BY_USER.eas.mockReceipient.address,
			time: 1728637333000n,
			expirationTime: NO_EXPIRATION,
			revocable: true,
			refUID: ZERO_BYTES32,
			data: zeroHash as Hex,
			salt,
		};

		beforeEach(async () => {
			attesterSigner = createTestEthersSigner(privateKey, chain.id);
			eas = createEAS(EASContractAddress, attesterSigner);
			attesterAddress = (await attesterSigner.getAddress()) as Address;
			console.log("attesterAddress", attesterAddress);

			// TODO error with invalid BytesLike value in test env (not in browser)
			// offchain = await eas.getOffchain();
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

			const offchain = await eas.getOffchain();
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
					...offchainTypedData,
				},
				{
					chain,
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
	},
);
