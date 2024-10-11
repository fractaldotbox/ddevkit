import { beforeEach, describe, it, expect, test } from "vitest";
import { createAttestation } from "./onchain-viem";
import { SignatureType } from "./eas";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { createEthersSigner } from "./etherjs-adapter";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { AccountNotFoundError } from "node_modules/viem/_types/errors/account";
import { createWalletClient, Hex, http } from "viem";
import { sepolia } from "viem/chains";
import { encodeBytes32String, ethers, JsonRpcProvider } from "ethers";

export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26

// TODO fixture
const recipient = "0x7f890c611c3B5b8Ff44FdF5Cf313FF4484a2D794";
export const ZERO_BYTES = "0x";
export const ZERO_BYTES32 =
	"0x0000000000000000000000000000000000000000000000000000000000000000";

describe("attest with sepolia contract", () => {
	test(
		"create attestation",
		async () => {
			const privateKey = process.env.TESTER_PRIVATE_KEY_EAS as Hex;
			const from = privateKeyToAccount(privateKey);

			const fromWalletClient = createWalletClient({
				chain: sepolia,
				transport: http(),
				account: from,
			});

			const txSigner = createEthersSigner(privateKey, sepolia.id);

			// for sdk parity
			const eas = new EAS(EASContractAddress);
			// eas.connect(txSginer)
			// "is a friend schema"
			// https://sepolia.easscan.org/schema/view/0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a
			const fixture = {
				// uid: '0x5134f511e0533f997e569dac711952dde21daf14b316f3cce23835defc82c065',
				schemaId:
					"0x27d06e3659317e9a4f8154d1e849eb53d43d91fb4f219884d1684f86d797804a",
				refUID: ZERO_BYTES32,
				time: 1728637333n,
				expirationTime: NO_EXPIRATION,
				revocationTime: 0n,
				// expirationTime: 1728633919n,
				// revocationTime: 1728633919n,
				recipient: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165",
				attester: from.address,
				revocable: true,
				// "yes"
				data: "0x0000000000000000000000000000000000000000000000000000000000000001",
				value: 0n,
			};

			const { schemaId, expirationTime, revocable, refUID, data, value } =
				fixture;

			const salt = encodeBytes32String("SALT");
			// const overrides = {
			//   signatureType: SignatureType.Direct,
			//   from: from.address,
			//   // maxFeePerGas: 100000000n.toString(),
			//   // maxPriorityFeePerGas: 2000000000n.toString(),
			//   deadline: 0n,
			// }

			const overrides = undefined;

			// use existing

			// fromWalletClient.sign

			const request = {
				schema: schemaId,
				data: { recipient, expirationTime, revocable, refUID, data, value },
			};

			const { uids, receipt } = await createAttestation(request, {
				account: from,
			});

			console.log("attested", { uids, receipt });
			/**
			 * use existing sdk
			 *
			 */

			// const txnSdk = await eas
			// 	.connect(txSigner)
			// 	.attest(
			// 		request,
			// 		overrides,
			// 	);

			// console.log("results", txnSdk);
			// const uid = await txnSdk.wait();

			// expect(await eas.isAttestationValid(uid)).to.be.true;
		},
		5 * 60 * 1000,
	);
});

describe.skip("attesting", () => {
	let expirationTime: bigint;
	const data = "0x1234";

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
