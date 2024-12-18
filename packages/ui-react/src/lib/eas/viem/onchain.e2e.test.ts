import { EAS, NO_EXPIRATION } from "@ethereum-attestation-service/eas-sdk";
import config from "@repo/domain/config";
import { SignatureType } from "@repo/ui-react/lib/eas";
import {
	createTestClientConfig,
	createTestEthersSigner,
} from "@repo/ui-react/lib/test-utils-isomorphic";
import { http, Hex, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { beforeEach, describe, expect, it, test } from "vitest";
import { SCHEMA_FIXTURE_IS_A_FRIEND } from "../eas-test.fixture";
import { createEAS } from "../ethers/onchain";
import { makeOnchainAttestation, revoke } from "./onchain";
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// TODO fixture
const recipient = "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794";

const privateKey = config.test.eas.privateKey as Hex;

describe("attest with sepolia contract", () => {
	describe(
		"create attestation",
		() => {
			const from = privateKeyToAccount(privateKey);

			const fixture = {
				schemaId: SCHEMA_FIXTURE_IS_A_FRIEND.schemaUID,
				refUID: ZERO_BYTES32,
				time: 1732433266n,
				expirationTime: NO_EXPIRATION,
				revocationTime: 0n,
				recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
				attester: from.address,
				revocable: true,
				// "yes"
				data: "0x0000000000000000000000000000000000000000000000000000000000000001" as Hex,
				value: 0n,
			};

			const txSigner = createTestEthersSigner(privateKey, sepolia.id);

			const eas = createEAS(EASContractAddress, txSigner);

			const { schemaId, expirationTime, revocable, refUID, data, value, time } =
				fixture;

			const request = {
				schema: schemaId,
				data: {
					recipient,
					expirationTime,
					revocable,
					refUID,
					data,
					value,
					time,
				},
			};

			// TODO
			test("with sdk ", async () => {
				const overrides = {
					signatureType: SignatureType.Direct,
					from: from.address,
				};

				const txnSdk = await eas.attest(request, overrides);

				console.log("attest with sdk txn", txnSdk);
				const uid = await txnSdk.wait();
				console.log("attest with sdk txn uid", uid);
				expect(await eas.isAttestationValid(uid)).to.be.true;
			});
			test("with viem ", async () => {
				const client = createWalletClient({
					...createTestClientConfig(),
					account: from,
				});

				const { uids } = await makeOnchainAttestation(client, request);

				console.log("attested", { uids });

				expect(await eas.isAttestationValid(uids?.[0])).to.be.true;
			});
		},
		5 * 60 * 1000,
	);

	describe("revoke", () => {
		beforeEach(async () => {});
		test("success", async () => {
			const eas = new EAS(EASContractAddress);

			const uid =
				"0x303193e78c6e6cb026dc729e60614dd9e949ea947c6084445293ded6c3b4b4a3";

			const from = privateKeyToAccount(privateKey);

			const fromWalletClient = createWalletClient({
				...createTestClientConfig(),
				account: from,
			});

			const schemaId =
				"0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a";

			const request = {
				schema: schemaId,
				data: {
					uid,
					value: 0n,
				},
			};

			const tx = await revoke(fromWalletClient, request);

			expect(await eas.isAttestationRevoked(uid)).to.be.true;
		});
	});
});

describe.skip("attesting", () => {
	let expirationTime: bigint;

	beforeEach(async () => {
		//   expirationTime = (await latest()) + duration.days(30n);
	});

	describe.each`
		signatureType | isRevocable | expected
		${{ val: 1 }} | ${"b"}      | ${"1b"}
		${{ val: 2 }} | ${"b"}      | ${"2b"}
		${{ val: 3 }} | ${"b"}      | ${"3b"}
	`(`via %s attestation`, () => {});
	// for (const [maxPriorityFeePerGas, maxFeePerGas] of [
	//   [undefined, undefined],
	//   [1000000000n, 200000000000n]
	// ]) {
	//   context(
	//     maxPriorityFeePerGas && maxFeePerGas
	//       ? `with maxPriorityFeePerGas=${maxPriorityFeePerGas.toString()}, maxFeePerGas=${maxFeePerGas.toString()} overrides`
	//       : 'with default fees',
	//     () => {
	//       context(`with ${revocable ? 'a revocable' : 'an irrevocable'} registered schema`, () => {
	//         const schema1 = 'bool like';
	//         const schema2 = 'bytes32 proposalId, bool vote';
	//         let schema1Id: string;
	//         let schema2Id: string;

	//         beforeEach(async () => {
	//           const tx1 = await schemaRegistry.register({ schema: schema1, revocable });
	//           const tx2 = await schemaRegistry.register({ schema: schema2, revocable });

	//           schema1Id = await tx1.wait();
	//           schema2Id = await tx2.wait();
	//         });

	//       //   it('should be able to query the schema registry', async () => {
	//       //     const schemaData = await schemaRegistry.getSchema({ uid: schema1Id });
	//       //     expect(schemaData.uid).to.equal(schema1Id);
	//       //     expect(schemaData.resolver).to.equal(ZERO_ADDRESS);
	//       //     expect(schemaData.revocable).to.equal(revocable);
	//       //     expect(schemaData.schema).to.equal(schema1);
	//       //   });

	//         it('should allow attestation to an empty recipient', async () => {
	//           await expectAttestation(
	//             eas,
	//             schema1Id,
	//             {
	//               recipient: ZERO_ADDRESS,
	//               expirationTime,
	//               revocable,
	//               data
	//             },
	//             {
	//               signatureType,
	//               from: sender,
	//               maxFeePerGas,
	//               maxPriorityFeePerGas,
	//               deadline: (await latest()) + duration.days(1n)
	//             }
	//           );
	//         });

	//   it('should allow self attestations', async () => {
	//     await expectAttestation(
	//       eas,
	//       schema1Id,
	//       { recipient: await sender.getAddress(), expirationTime, revocable, data },
	//       {
	//         signatureType,
	//         from: sender,
	//         maxFeePerGas,
	//         maxPriorityFeePerGas,
	//         deadline: (await latest()) + duration.days(1n)
	//       }
	//     );
	//   });

	//   it('should allow multiple attestations', async () => {
	//     await expectAttestation(
	//       eas,
	//       schema1Id,
	//       {
	//         recipient: await recipient.getAddress(),
	//         expirationTime,
	//         revocable,
	//         data: encodeBytes32String('0')
	//       },
	//       {
	//         signatureType,
	//         from: sender,
	//         maxFeePerGas,
	//         maxPriorityFeePerGas,
	//         deadline: (await latest()) + duration.days(1n)
	//       }
	//     );

	//     await expectAttestation(
	//       eas,
	//       schema1Id,
	//       {
	//         recipient: await recipient2.getAddress(),
	//         expirationTime,
	//         revocable,
	//         data: encodeBytes32String('1')
	//       },
	//       {
	//         signatureType,
	//         from: sender,
	//         maxFeePerGas,
	//         maxPriorityFeePerGas,
	//         deadline: (await latest()) + duration.days(1n)
	//       }
	//     );
	//   });

	//   if (signatureType !== SignatureType.Offchain) {
	//     it('should allow multi attestations', async () => {
	//       await expectMultiAttestations(
	//         eas,
	//         [
	//           {
	//             schema: schema1Id,
	//             data: [
	//               {
	//                 recipient: await recipient.getAddress(),
	//                 expirationTime,
	//                 revocable,
	//                 data: encodeBytes32String('0')
	//               },
	//               {
	//                 recipient: await recipient2.getAddress(),
	//                 expirationTime,
	//                 revocable,
	//                 data: encodeBytes32String('1')
	//               }
	//             ]
	//           },
	//           {
	//             schema: schema2Id,
	//             data: [
	//               {
	//                 recipient: await recipient.getAddress(),
	//                 expirationTime,
	//                 revocable,
	//                 data: encodeBytes32String('2')
	//               },
	//               {
	//                 recipient: await recipient2.getAddress(),
	//                 expirationTime,
	//                 revocable,
	//                 data: encodeBytes32String('3')
	//               }
	//             ]
	//           }
	//         ],
	//         {
	//           signatureType,
	//           from: sender,
	//           maxFeePerGas,
	//           maxPriorityFeePerGas,
	//           deadline: (await latest()) + duration.days(1n)
	//         }
	//       );
	//     });
	//   }

	//   it('should allow attestation without expiration time', async () => {
	//     await expectAttestation(
	//       eas,
	//       schema1Id,
	//       { recipient: await recipient.getAddress(), expirationTime: NO_EXPIRATION, revocable, data },
	//       {
	//         signatureType,
	//         from: sender,
	//         maxFeePerGas,
	//         maxPriorityFeePerGas,
	//         deadline: (await latest()) + duration.days(1n)
	//       }
	//     );
	//   });

	//   it('should allow attestation without any data', async () => {
	//     await expectAttestation(
	//       eas,
	//       schema1Id,
	//       { recipient: await recipient.getAddress(), expirationTime, revocable, data: ZERO_BYTES },
	//       {
	//         signatureType,
	//         from: sender,
	//         maxFeePerGas,
	//         maxPriorityFeePerGas,
	//         deadline: (await latest()) + duration.days(1n)
	//       }
	//     );
	//   });

	//   it('should store referenced attestation', async () => {
	//     const uid = await (
	//       await eas.attest({
	//         schema: schema1Id,
	//         data: { recipient: await recipient.getAddress(), expirationTime, revocable, data }
	//       })
	//     ).wait();

	//     await expectAttestation(
	//       eas,
	//       schema1Id,
	//       { recipient: await recipient.getAddress(), expirationTime, revocable, refUID: uid, data },
	//       {
	//         signatureType,
	//         from: sender,
	//         maxFeePerGas,
	//         maxPriorityFeePerGas,
	//         deadline: (await latest()) + duration.days(1n)
	//       }
	//     );
	//   });
});
//       }
//     );
//   }
// }
// });
// }
// });
