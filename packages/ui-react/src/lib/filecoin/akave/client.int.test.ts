import { faker } from "@faker-js/faker";
import rootConfig from "@geist/domain/config";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import {
	AkaveBucket,
	createBucket,
	listBucketFiles,
	listBuckets,
	uploadFileObject,
	uploadFileWithFormData,
} from "#lib/filecoin/akave/client";
import { createTestContent, createTestFile } from "#lib/test-utils-node";

describe(
	"with file",
	() => {
		const config = {
			akaveEndpointUrl: rootConfig.akave.endpointUrl!,
		};
		const testBucketNameCreate = "test-bucket-create";
		const testBucketNameExists = "test-bucket";

		const testContent = createTestContent();

		let testFilePath = "";
		let testFileName = "";

		beforeAll(() => {
			const { filePath, fileName } = createTestFile(testContent);
			testFilePath = filePath;
			testFileName = fileName;
		});

		test.skip("create bucket", async () => {
			const results = await createBucket({
				...config,
				bucketName: testBucketNameCreate,
			});

			const { data, success } = results;

			expect(success).toEqual(true);
			expect(data?.ID).toBeDefined();
			expect(data?.transactionHash).toBeDefined();
		});

		test("#listBuckets", async () => {
			const results = await listBuckets(config);
			// console.log("results", results);
			expect(
				!!results.data!.find(
					(bucket: any) => bucket.Name === testBucketNameExists,
				),
			).toEqual(true);
		});

		test("#listBucketFiles", async () => {
			const files = await listBucketFiles({
				...config,
				bucketName: testBucketNameExists,
			});
			// console.log("files", files);
			// expect(!!files.length > 0).toEqual(true);
		});

		test("uploadFileObject", async () => {
			const file = {
				lorem: testContent,
			};
			const response = await uploadFileObject({
				...config,
				fileName: testFileName,
				file,
				bucketName: testBucketNameExists,
			});
			expect(response).toHaveProperty("success", true);
			// Add more assertions as needed
		});

		test.only("uploadFileWithFormData", async () => {
			const file = new File([testContent], testFileName, {
				type: "text/plain",
			});
			const response = await uploadFileWithFormData({
				...config,
				fileName: testFileName,
				file,
				bucketName: testBucketNameExists,
			});
		});

		// TODO delete bucket
		afterAll(async () => {});
	},
	60 * 1000,
);
