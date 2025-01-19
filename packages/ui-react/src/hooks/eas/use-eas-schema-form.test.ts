import { getRandomAddress } from "@geist/domain/user.fixture";
import { describe, expect, it } from "vitest";
import {
	getSubmissionData,
	getZodSchemaFromSchemaString,
} from "./use-eas-schema-form";

describe("use-schema-eas-form", () => {
	describe("#getZodSchemaFromSchemaString", () => {
		it("should correctly produce zod schema", () => {
			const sampleEasSchema = getZodSchemaFromSchemaString(
				"address walletAddress,string requestId,bool hasClaimedNFT,string message",
			);

			const randomAddress = getRandomAddress();

			expect(
				sampleEasSchema.parse({
					walletAddress: randomAddress,
					requestId: "123",
					hasClaimedNFT: true,
					message: "hello world",
				}),
			).toEqual({
				walletAddress: randomAddress,
				requestId: "123",
				hasClaimedNFT: true,
				message: "hello world",
			});

			expect(() =>
				sampleEasSchema.parse({
					walletAddress: randomAddress,
					requestId: "123",
					hasClaimedNFT: true,
				}),
			).toThrow();

			expect(() =>
				sampleEasSchema.parse({
					walletAddress: randomAddress,
					requestId: "123",
					hasClaimedNFT: "true",
					message: "hello world",
				}),
			).toThrow();
		});

		it("should correctly produce zod schema with array", () => {
			const sampleEasSchema = getZodSchemaFromSchemaString(
				"address walletAddress,string requestId,bool hasClaimedNFT,string message,string[] characters",
			);

			const randomAddress = getRandomAddress();

			expect(() =>
				sampleEasSchema.parse({
					walletAddress: randomAddress,
					requestId: "123",
					hasClaimedNFT: true,
					message: "hello world",
					characters: "vitalik",
				}),
			).toThrow();

			expect(
				sampleEasSchema.parse({
					walletAddress: randomAddress,
					requestId: "123",
					hasClaimedNFT: true,
					message: "hello world",
					characters: ["tony", "alice", "vitalik"],
				}),
			).toEqual({
				walletAddress: randomAddress,
				requestId: "123",
				hasClaimedNFT: true,
				message: "hello world",
				characters: ["tony", "alice", "vitalik"],
			});
		});
	});

	describe("#getSubmissionData", () => {
		it("happy flow", () => {
			const data = getSubmissionData(
				"address walletAddress,string requestId,bool hasClaimedNFT,string message",
				{
					walletAddress: "0x123",
					requestId: "abcdef",
					hasClaimedNFT: false,
					message: "test",
				},
			);

			expect(data).toEqual([
				{ name: "walletAddress", value: "0x123", type: "address" },
				{ name: "requestId", value: "abcdef", type: "string" },
				{ name: "hasClaimedNFT", value: false, type: "bool" },
				{ name: "message", value: "test", type: "string" },
			]);
		});
	});
});
