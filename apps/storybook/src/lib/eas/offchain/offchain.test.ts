import { beforeEach, describe, test } from "vitest";
import { createEAS } from "../ethers/onchain";
import { EASContractAddress } from "../viem/onchain.test";
import { sepolia } from "viem/chains";
import {
	EAS,
	getOffchainUID,
	OffchainAttestationVersion,
} from "@ethereum-attestation-service/eas-sdk";
import { createEthersSigner } from "../ethers";
import { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { encodeBytes32String } from "ethers";
import { SCHEMA_FIXTURE_IS_A_FRIEND } from "../eas-test.fixture";

describe("offchain attestation handling/verification", () => {
	let eas: EAS;
	beforeEach(() => {
		const privateKey = process.env.TESTER_PRIVATE_KEY_EAS as Hex;
		const from = privateKeyToAccount(privateKey);

		const signer = createEthersSigner(privateKey, sepolia.id);
		eas = createEAS(EASContractAddress, signer);
	});
	test("create attestation", async () => {
		// const salt = encodeBytes32String("SALT");
		// const uid = getOffchainUID(
		// 	OffchainAttestationVersion.Version2,
		// 	schema: VOTE_SCHEMA_FIXTURE.schemaString,
		// 	// recipient,
		// 	// now,
		// 	// expirationTime,
		// 	// revocable,
		// 	// refUID,
		// 	// data,
		// 	// salt,
		// );
		// const offchain = await eas.getOffchain();
		// createEAS(EASContractAddress, signer);
		// // const attestation = await offchain.signOffchainAttestation(
		// // 	{
		// // 		schema,
		// // 		recipient,
		// // 		time: now,
		// // 		expirationTime,
		// // 		revocable,
		// // 		refUID,
		// // 		data,
		// // 		salt,
		// // 	},
		// // 	txSender,
		// // );
	});
	// TODO
	test.skip("should verify attestation onchain", async () => {});
});
