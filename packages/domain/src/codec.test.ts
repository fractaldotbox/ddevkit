import { describe, expect, test } from "vitest";
import { isCID } from "#codec";

describe("codec", () => {
	test.each([
		// v1
		["bagaaierasords4njcts6vs7qvdjfcvgnume4hqohf65zsfguprqphs3icwea", true],
		// v0
		["QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF", true],
		["abc", false],
		["", false],
	])("#isCID", async (cid, expected) => {
		const result = isCID(cid);
		expect(result).toBe(expected);
	});
});
