import { deflateSync, inflateSync, unzlibSync, zlibSync } from "fflate";
import pako from "pako";
import { describe, expect, test } from "vitest";
import { stringifyWithBigInt } from "./util";

describe("zip", () => {
	const fixtures = [
		{
			a: {
				b: 2,
				c: 3,
				e: {
					f: {
						g: 4,
					},
				},
			},
		},
		{
			d: 13n,
			e: "0xabc",
		},
		// long string to trigger difference & error
		{
			unequalOutput:
				"fsjdkal;fjldskfkjfldasfjfkldsjldjfsfsdjkljdlfjsdkfjdslfjdskfj",
		},
	];
	test.each(fixtures)("pako fflate compatability", (fixture) => {
		const fixtureString = stringifyWithBigInt(fixture);

		const fixture1Bytes = new TextEncoder().encode(fixtureString);

		// https://zlib.net/manual.html#Advanced
		const pakoDeflate = pako.deflate(fixtureString, {
			level: 9,
			// windowbits will affect results
			windowBits: 15,
			strategy: 0,
			gzip: false,
			header: {
				// hrcc: true
				// text: true
			},
		});
		const pakoDeflateRaw = pako.deflateRaw(fixtureString, { level: 9 });

		expect(pakoDeflate).not.toEqual(pakoDeflateRaw);

		const fflateZlib = zlibSync(fixture1Bytes, { level: 9 });
		const fflateDeflate = deflateSync(fixture1Bytes, { level: 9 });

		if (!fixture.unequalOutput) {
			expect(fflateZlib).toEqual(pakoDeflate);
			expect(fflateDeflate).toEqual(pakoDeflateRaw);
		}

		const pakoInflate = pako.inflate(pakoDeflate);
		expect(new TextDecoder().decode(pakoInflate)).toEqual(fixtureString);

		expect(pako.inflateRaw(fflateDeflate)).toEqual(pakoInflate);
		expect(pako.inflateRaw(fflateDeflate, { to: "string" })).toEqual(
			fixtureString,
		);

		expect(pako.inflate(fflateZlib)).toEqual(pakoInflate);

		const fflateInflate = inflateSync(fflateDeflate);
		expect(new TextDecoder().decode(fflateInflate)).toEqual(fixtureString);
		expect(unzlibSync(fflateZlib)).toEqual(pakoInflate);
		expect(unzlibSync(pakoDeflate)).toEqual(pakoInflate);
	});
});
