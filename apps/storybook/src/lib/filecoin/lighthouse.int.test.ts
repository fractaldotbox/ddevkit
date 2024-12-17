import { privateKeyToAccount } from "viem/accounts";
import { beforeAll, describe, expect, test } from "vitest";
import {
	createLighthouseParams,
	retrieveFile,
	retrievePoDsi,
	uploadEncryptedFileWithText,
	uploadFiles,
	uploadText,
} from "./lighthouse/isomorphic";

import { BY_USER } from "../../stories/fixture";
import { createTestFile } from "@repo/ui-react/lib/test-utils-node";
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
	"lighthouse",
	() => {
		let testFilePath;
		let testFileName;

		const testContent = "abcde";

		beforeAll(() => {
			const { filePath, fileName } = createTestFile(testContent);
			testFilePath = filePath;
			testFileName = fileName;
		});

		describe("upload", () => {
			let account = privateKeyToAccount(BY_USER.mock.privateKey);
			let { file, filePath } = createTestFile(testContent);
			beforeAll(() => {});

			test.only("#uploadFile", async () => {
				const params = await createLighthouseParams({
					account,
					options: {
						apiKey: LIGHTHOUSE_API_KEY,
					},
				});
				const response = await uploadFiles([file], LIGHTHOUSE_API_KEY);

				expect(!!response.cid).toEqual(true);

				console.log("cid", cid);
			});

			// TODO fix: Error: Error encrypting file
			test.skip("uploadFile encrypted", async () => {
				const account = privateKeyToAccount(BY_USER.mock.privateKey);
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

		test("#retrieveFile", async () => {
			const buffer = await retrieveFile(cid);
			const decoder = new TextDecoder("utf-8");
			const text = decoder.decode(buffer);
			expect(text).toEqual("abcde");
		});
	},
	60 * 1000,
);
