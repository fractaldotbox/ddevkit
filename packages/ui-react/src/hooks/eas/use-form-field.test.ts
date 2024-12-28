import { describe, expect, it } from "vitest";
import { getZodSchemaFromSchemaString } from "./use-form-field";
import { getRandomAddress } from "@geist/domain/user.fixture";
import { Z } from "vitest/dist/chunks/reporters.D7Jzd9GS.js";
import { z } from "zod";

describe("use-form-field", () => {
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
});
