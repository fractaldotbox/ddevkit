import { describe, expect, test } from "vitest";
import {
	createLighthouseParams,
	getFile,
	retrievePoDsi,
	uploadEncryptedFileWithText,
	uploadText,
} from "./lighthouse/isomorphic";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

import { BY_USER } from "../../stories/fixture";
/**
 * Test on mainnet
 */

// account 0xb5fE438f29Cc9787fC8C968eEF2D17cA15aee74b
const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY!;
//workaround at test
globalThis.crypto ??= require("node:crypto").webcrypto;

// abcde
const cid = "QmS9ErDVxHXRNMJRJ5i3bp1zxCZzKP8QXXNH1yUR6dWeKZ";

describe(
	"with file encrypted",
	() => {
		const walletPrivateKey = generatePrivateKey();
		// TODO fix: Error: Error encrypting file
		test.skip("uploadFile encrypted", async () => {
			const account = privateKeyToAccount(walletPrivateKey);
			const params = await createLighthouseParams({
				account,
				options: {
					apiKey: LIGHTHOUSE_API_KEY,
				},
			});
			const response = await uploadEncryptedFileWithText("abcde", ...params);

			expect(!!response.cid).toEqual(true);

			console.log("cid", cid);
		});

		// from official example

		// TODO fix
		// testnet only && take a few minutes after upload & replication
		test.skip("#retrievePoDsi", async () => {
			const cid = "QmYTaCnjNrrKCwXzC8ZLiiNJ78rsobXtfKwN8s9qCLBzVA";
			const podsi = await retrievePoDsi(cid);
			console.log("podsi", JSON.stringify(podsi));
			// no pieceID
			// expect(podsi.dealInfo).toEqual(1);
			expect(!!podsi.dealInfo).toEqual(true);
			// pieceCID vs cid
		});

		// TODO cross-check with cid lib. it is including metadata
		test("#uploadText", async () => {
			const response = await uploadText("abcde", LIGHTHOUSE_API_KEY!);
			console.log(response);

			const { name, cid, size } = response;
			expect(name).toEqual("text");
			expect(size).toEqual(5);
			expect(cid).toEqual(
				"bafkreibwxpsq5wliihiqiq54wzynmvkpbi2loyn6m7wjysuk2lamitfefq",
			);
		});

		test("#getFile", async () => {
			const buffer = await getFile(cid);
			console.log("buffer", buffer.toString());
			expect(buffer.toString()).toEqual("abcde");
		});

		// test.skip('#mapCidAsBytes', async ()=>{
		//   const pieceCID = 'baga6ea4seaqkp2pjlh6avlvee6ib2maanav5sc35l5glf3zm6rd6hmfgcx5xeji'
		//   const bytes = mapCidAsBytes(pieceCID)
		//   expect(bytes).toEqual('')
		// });
	},
	60 * 1000,
);
