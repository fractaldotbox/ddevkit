import {
	base,
	baseGoerli,
	baseSepolia,
	optimism,
	optimismSepolia,
} from "viem/chains";
import { describe, expect, test } from "vitest";
import { resolveChainWithName, resolveProductionChain } from "./chain-resolver";

describe("ChainResolver", () => {
	test("should resolve production chain", () => {
		expect(resolveProductionChain(optimismSepolia)).toEqual(optimism);
		expect(resolveProductionChain(baseGoerli)).toEqual(base);
	});
	test("should resolve chain with name", () => {
		expect(resolveChainWithName("optimism")!.name).toEqual(optimism.name);
		expect(
			resolveChainWithName("optimismsepolia", [optimismSepolia, baseSepolia])!
				.name,
		).toEqual(optimismSepolia.name);
		expect(resolveChainWithName("base")).toEqual(base);
	});
});
