// { "method": "add", "params": [1, 2], "id": 1 }

// 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

import { BY_USER } from "@geist/domain/user.fixture";
import { describe, expect, it } from "vitest";
import { rpcBalanceTool, rpcTool } from "./index";

describe("Tools", () => {
	it("rpcBalanceTool should get balance for an address", async () => {
		const result = await rpcBalanceTool.execute!({
			context: {
				address: BY_USER.vitalik.address,
			},
		});

		expect(result).toHaveProperty("balance");
		expect(typeof result.balance).toBe("string");
		expect(result.balance).toMatch(/^[0-9]+$/);
	});

	it("rpcTool should send generic request", async () => {
		const result = await rpcTool.execute!({
			context: {
				method: "eth_blockNumber",
				params: [],
			},
		});

		expect(result).toHaveProperty("data");
		expect(result.data as string).toMatch(/^0x[0-9a-fA-F]+$/);
	});
});
