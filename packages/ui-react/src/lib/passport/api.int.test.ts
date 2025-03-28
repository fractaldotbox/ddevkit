import { BY_USER } from "@geist/domain/user.fixture";
import { describe, expect, it } from "vitest";
import * as api from "./api";

// Test Ethereum address to use for testing
const TEST_ADDRESS = BY_USER.vitalik.address;

describe("Passport API Integration Tests", () => {
	describe("getScoreWithAddress", () => {
		it("should fetch a score for an address", async () => {
			const result = await api.getScoreWithAddress(TEST_ADDRESS);

			expect(result).toBeDefined();
			expect(result.address).toBe(TEST_ADDRESS);
			expect(typeof result.details.models.aggregate.score).toBe("number");
		});
	});

	describe("getStampsMetadata", () => {
		it("should fetch a list of stamps metadata", async () => {
			const res = await api.getStampsMetadata();

			expect(Array.isArray(res?.[0]?.groups?.[0]?.stamps)).toBe(true);
			const stamp = res?.[0]?.groups?.[0]?.stamps?.[0];
			expect(stamp).toHaveProperty("name");
			expect(stamp).toHaveProperty("hash");
		});
	});

	describe("getStampsByAddress", () => {
		it("should fetch stamps for an address", async () => {
			const result = await api.getStampsByAddress(TEST_ADDRESS, true);

			expect(result).toBeDefined();
			expect(Array.isArray(result.items)).toBe(true);

			const stamp = result.items[0]!;
			expect(stamp).toHaveProperty("credential");
			expect(stamp?.metadata).toHaveProperty("name");
			expect(stamp?.metadata).toHaveProperty("description");
		});
	});
});
