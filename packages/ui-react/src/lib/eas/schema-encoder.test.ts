import { AbiCoder } from "ethers";
import { Hex, encodeAbiParameters } from "viem";
import { beforeEach, describe, expect, test } from "vitest";
import { ZERO_ADDRESS } from "#lib/constants";
import { SchemaEncoder as SchemaEncoderEasSdk } from "#lib/eas/sdk/offchain/schema-encoder";
import { SchemaEncoder, decodeIpfsValue } from "./schema-encoder";

describe("SchemaEncoder", () => {
	describe("construction", () => {
		test.for([
			{
				schema: "bool like",
				decodedSchema: [
					{
						name: "like",
						type: "bool",
						signature: "bool like",
						value: false,
					},
				],
			},
			{
				schema: "address contractAddress,bool trusted",
				decodedSchema: [
					{
						name: "contractAddress",
						type: "address",
						signature: "address contractAddress",
						value: ZERO_ADDRESS,
					},
					{
						name: "trusted",
						type: "bool",
						signature: "bool trusted",
						value: false,
					},
				],
			},
			{
				schema: "bytes32 eventId,uint8 ticketType,uint32 ticketNum",
				decodedSchema: [
					{
						name: "eventId",
						type: "bytes32",
						signature: "bytes32 eventId",
						value: "",
					},
					{
						name: "ticketType",
						type: "uint8",
						signature: "uint8 ticketType",
						value: "0",
					},
					{
						name: "ticketNum",
						type: "uint32",
						signature: "uint32 ticketNum",
						value: "0",
					},
				],
			},
			{
				schema: "bytes32,uint8,uint32",
				decodedSchema: [
					{
						name: "",
						type: "bytes32",
						signature: "bytes32",
						value: "",
					},
					{
						name: "",
						type: "uint8",
						signature: "uint8",
						value: "0",
					},
					{
						name: "",
						type: "uint32",
						signature: "uint32",
						value: "0",
					},
				],
			},
			{
				schema: "uint8 voteIndex,(string key,uint8 value)[] map",
				decodedSchema: [
					{
						name: "voteIndex",
						type: "uint8",
						signature: "uint8 voteIndex",
						value: "0",
					},
					{
						name: "map",
						type: "(string,uint8)[]",
						signature: "(string key,uint8 value)[] map",
						value: [],
					},
				],
			},
			{
				schema:
					"uint8  voteIndex,        (string key,   uint8 value)[]      map",
				decodedSchema: [
					{
						name: "voteIndex",
						type: "uint8",
						signature: "uint8 voteIndex",
						value: "0",
					},
					{
						name: "map",
						type: "(string,uint8)[]",
						signature: "(string key,uint8 value)[] map",
						value: [],
					},
				],
			},
		])(
			"should properly construct a schema encoder",
			({ schema, decodedSchema }) => {
				const schemaEncoderEasSdk = new SchemaEncoderEasSdk(schema);
				expect(schemaEncoderEasSdk.schema).to.deep.equal(decodedSchema);

				const schemaEncoder = new SchemaEncoder(schema);
				expect(schemaEncoder.schema).to.deep.equal(decodedSchema);
			},
		);

		test.for([
			"boo like",
			"adss contractAddress,bool trusted",
			"bytes32 eventId,uint8 ticketType,uint10000 ticketNum",
			"bytes32 eventId,uint8 ticketType,ticketNum",
		])("will throw", (schema: string) => {
			expect(() => new SchemaEncoderEasSdk(schema)).to.throw(Error);

			expect(() => new SchemaEncoder(schema)).to.throw(Error);
		});
	});

	describe.each([
		{
			schema: "bool like",
			types: ["bool"],
			inputs: [
				{
					in: [{ type: "bool", name: "like", value: true }],
				},
				{
					in: [{ type: "bool", name: "like", value: false }],
				},
			],
		},
		{
			schema: "address contractAddress,bool trusted",
			types: ["address", "bool"],
			inputs: [
				{
					in: [
						{
							type: "address",
							name: "contractAddress",
							value: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
						},
						{ type: "bool", name: "trusted", value: true },
					],
				},
				{
					in: [
						{
							type: "address",
							name: "contractAddress",
							value: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
						},
						{ type: "bool", name: "trusted", value: false },
					],
				},
			],
		},
		{
			schema: "address[] contractAddresses, string[] names",
			types: ["address[]", "string[]"],
			inputs: [
				{
					in: [
						{
							type: "address[]",
							name: "contractAddresses",
							value: [
								"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
								"0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
							],
						},
						{ type: "string[]", name: "names", value: ["abc", "def"] },
					],
				},
			],
		},
		{
			schema: "bytes32 eventId,uint8 ticketType,uint32 ticketNum",
			types: ["bytes32", "uint8", "uint32"],
			inputs: [
				{
					in: [
						{
							type: "bytes32",
							name: "eventId",
							value:
								"0x2bbd66db77a761a69195c2ee81b158a0e15e02d47d4528098ae059e0937b9cf2",
						},
						{ type: "uint8", name: "ticketType", value: 8 },
						{ type: "uint32", name: "ticketNum", value: 100_000 },
					],
				},
				{
					in: [
						{
							type: "bytes32",
							name: "eventId",
							value:
								"0xcacdee2a5c6a7e013524774dd74ed464ac260e97e6c8d6b5da2ba8d6eb775946",
						},
						{ type: "uint8", name: "ticketType", value: 0 },
						{ type: "uint32", name: "ticketNum", value: 0 },
					],
				},
				{
					in: [
						{
							type: "bytes32",
							name: "eventId",
							value:
								"0x98f9b0ef313ddecf10200c3943bdd8f2347e151f9ae814a286bde35e323b564d",
						},
						{ type: "uint8", name: "ticketType", value: 255 },
						{ type: "uint32", name: "ticketNum", value: 1_000_000 },
					],
				},
			],
		},
		// {
		// 	schema: "uint256 id,ipfsHash hash",
		// 	types: ["uint256", "bytes32"],
		// 	inputs: [
		// 		{
		// 			in: [
		// 				{ type: "uint256", name: "id", value: 123n },
		// 				{
		// 					type: "ipfsHash",
		// 					name: "hash",
		// 					value:
		// 						"0x55f51668121cf19209d29b2a5a36c34f38c66d65e42135e67e914b6aed448bf7",
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint256", name: "id", value: 123n },
		// 				{
		// 					type: "bytes32",
		// 					name: "hash",
		// 					value:
		// 						"0x55f51668121cf19209d29b2a5a36c34f38c66d65e42135e67e914b6aed448bf7",
		// 				},
		// 			],
		// 		},
		// 		{
		// 			in: [
		// 				{ type: "uint256", name: "id", value: 0n },
		// 				{
		// 					type: "ipfsHash",
		// 					name: "hash",
		// 					value:
		// 						"0x778d1b0841d47524bf882bbe8e23993f1cf41ccfaea0769fe5215e7008b10655",
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint256", name: "id", value: 0n },
		// 				{
		// 					type: "bytes32",
		// 					name: "hash",
		// 					value:
		// 						"0x778d1b0841d47524bf882bbe8e23993f1cf41ccfaea0769fe5215e7008b10655",
		// 				},
		// 			],
		// 		},
		// 		{
		// 			in: [
		// 				{ type: "uint256", name: "id", value: 1_000_000n },
		// 				{
		// 					type: "ipfsHash",
		// 					name: "hash",
		// 					value:
		// 						"0x822c3d2fc4181bc4eddd792c1b7c18790f8d0b4d207eb0f1d2a2474d0b9baefa",
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint256", name: "id", value: 1_000_000n },
		// 				{
		// 					type: "bytes32",
		// 					name: "hash",
		// 					value:
		// 						"0x822c3d2fc4181bc4eddd792c1b7c18790f8d0b4d207eb0f1d2a2474d0b9baefa",
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// {
		// 	schema: "uint8 voteIndex,(string key,uint8 value)[] map",
		// 	types: ["uint8", "(string key,uint8 value)[]"],
		// 	inputs: [
		// 		{
		// 			in: [
		// 				{ type: "uint8", name: "voteIndex", value: "123" },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [{ key: "voter1", value: 1n }],
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint8", name: "voteIndex", value: "123" },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [
		// 						[
		// 							{ name: "key", type: "string", value: "voter1" },
		// 							{ name: "value", type: "uint8", value: 1n },
		// 						],
		// 					],
		// 				},
		// 			],
		// 		},
		// 		{
		// 			in: [
		// 				{ type: "uint8", name: "voteIndex", value: 100 },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [
		// 						{ key: "voter1", value: 1n },
		// 						{ key: "voter2", value: 2n },
		// 						{ key: "voter3", value: 3n },
		// 					],
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint8", name: "voteIndex", value: 100 },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [
		// 						[
		// 							{ name: "key", type: "string", value: "voter1" },
		// 							{ name: "value", type: "uint8", value: 1n },
		// 						],
		// 						[
		// 							{ name: "key", type: "string", value: "voter2" },
		// 							{ name: "value", type: "uint8", value: 2n },
		// 						],
		// 						[
		// 							{ name: "key", type: "string", value: "voter3" },
		// 							{ name: "value", type: "uint8", value: 3n },
		// 						],
		// 					],
		// 				},
		// 			],
		// 		},
		// 		{
		// 			in: [
		// 				{ type: "uint8", name: "voteIndex", value: 7 },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [
		// 						["voter1", 10n],
		// 						["voter2", 20n],
		// 						["voter3", 30n],
		// 					],
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint8", name: "voteIndex", value: 7 },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [
		// 						[
		// 							{ name: "key", type: "string", value: "voter1" },
		// 							{ name: "value", type: "uint8", value: 10n },
		// 						],
		// 						[
		// 							{ name: "key", type: "string", value: "voter2" },
		// 							{ name: "value", type: "uint8", value: 20n },
		// 						],
		// 						[
		// 							{ name: "key", type: "string", value: "voter3" },
		// 							{ name: "value", type: "uint8", value: 30n },
		// 						],
		// 					],
		// 				},
		// 			],
		// 		},
		// 		{
		// 			in: [
		// 				{ type: "uint8", name: "voteIndex", value: 9 },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [],
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint8", name: "voteIndex", value: 9 },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [],
		// 				},
		// 			],
		// 		},
		// 		{
		// 			in: [
		// 				{ type: "uint8", name: "voteIndex", value: 222 },
		// 				{
		// 					type: "(string,    uint8)[]",
		// 					name: "map",
		// 					value: [],
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "uint8", name: "voteIndex", value: 222 },
		// 				{
		// 					type: "(string,uint8)[]",
		// 					name: "map",
		// 					value: [],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// {
		// 	schema: "string name,(string key,string value) entry",
		// 	types: ["string", "(string key,string value)"],
		// 	inputs: [
		// 		{
		// 			in: [
		// 				{ type: "string", name: "name", value: "Entry 1" },
		// 				{
		// 					type: "(string,string)",
		// 					name: "entry",
		// 					value: { key: "entry1", value: "data1" },
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "string", name: "name", value: "Entry 1" },
		// 				{
		// 					type: "(string,string)",
		// 					name: "entry",
		// 					value: [
		// 						{ name: "key", type: "string", value: "entry1" },
		// 						{ name: "value", type: "string", value: "data1" },
		// 					],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// {
		// 	schema: "string     name,      (string    key, string value   ) entry",
		// 	types: ["string", "(string   key,  string value)"],
		// 	inputs: [
		// 		{
		// 			in: [
		// 				{ type: "string", name: "name", value: "Entry 1" },
		// 				{
		// 					type: "(string,    string)",
		// 					name: "entry",
		// 					value: { key: "entry1", value: "data1" },
		// 				},
		// 			],
		// 			out: [
		// 				{ type: "string", name: "name", value: "Entry 1" },
		// 				{
		// 					type: "(string,string)",
		// 					name: "entry",
		// 					value: [
		// 						{ name: "key", type: "string", value: "entry1" },
		// 						{ name: "value", type: "string", value: "data1" },
		// 					],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// {
		// 	schema: "(uint256 badgeId,uint256 level)[] badges",
		// 	types: ["(uint256 badgeId,uint256 level)[]"],
		// 	inputs: [
		// 		{
		// 			in: [
		// 				{
		// 					type: "(uint256,uint256)[]",
		// 					name: "badges",
		// 					value: [
		// 						{ badgeId: 1n, level: 10n },
		// 						{ badgeId: 2n, level: 20n },
		// 						{ badgeId: 3n, level: 30n },
		// 					],
		// 				},
		// 			],
		// 			out: [
		// 				{
		// 					type: "(uint256,uint256)[]",
		// 					name: "badges",
		// 					value: [
		// 						[
		// 							{ name: "badgeId", type: "uint256", value: 1n },
		// 							{ name: "level", type: "uint256", value: 10n },
		// 						],
		// 						[
		// 							{ name: "badgeId", type: "uint256", value: 2n },
		// 							{ name: "level", type: "uint256", value: 20n },
		// 						],
		// 						[
		// 							{ name: "badgeId", type: "uint256", value: 3n },
		// 							{ name: "level", type: "uint256", value: 30n },
		// 						],
		// 					],
		// 				},
		// 			],
		// 		},
		// 	],
		// },
		// `params ${JSON.stringify(params, (_, v) => (v && v.toString()) || v)}`
	])(`encode/decode`, ({ schema, types, inputs }) => {
		let schemaEncoder: SchemaEncoder;
		let schemaEncoderEasSdk: SchemaEncoderEasSdk;

		beforeEach(() => {
			schemaEncoderEasSdk = new SchemaEncoderEasSdk(schema);
			schemaEncoder = new SchemaEncoder(schema);
		});

		test.for(inputs as { in: any[]; out: any[]; raw: any[] }[])(
			"should properly encode and decode data",
			(params) => {
				const encodedEasSdk = schemaEncoderEasSdk.encodeData(params.in) as Hex;
				const encoded = schemaEncoder.encodeData(params.in) as Hex;

				const expectEncoded = encodeAbiParameters(
					params.in.map(({ name, type }) => ({ name, type })),
					params.in.map((p) => p.value),
				);

				expect(encodedEasSdk).to.equal(expectEncoded);
				expect(encoded).to.equal(expectEncoded);

				expect(schemaEncoderEasSdk.isEncodedDataValid(encodedEasSdk)).to.be
					.true;
				expect(schemaEncoder.isEncodedDataValid(encodedEasSdk)).to.be.true;
				expect(schemaEncoderEasSdk.isEncodedDataValid(encodedEasSdk)).to.be
					.true;

				function validateDecoded(schema: any, decoded: any) {
					for (const [
						i,
						{ name, type, signature, value },
					] of decoded.entries()) {
						const schema = schemaEncoder.schema[i]!;
						expect(name).to.equal(schema.name);
						expect(type).to.equal(schema.type);
						expect(signature).to.equal(schema.signature);

						const expectedValue = params.out ? params.out[i] : params.in[i];
						expect(value.name).to.equal(expectedValue.name);
						expect(value.type).to.equal(expectedValue.type);

						if (typeof value.value === "bigint") {
							expect(value.value).to.deep.equal(BigInt(expectedValue.value));
						} else {
							expect(value.value).to.deep.equal(expectedValue.value);
						}
					}
				}

				const decoded = schemaEncoder.decodeData(encoded);
				const decodedEasSdk = schemaEncoderEasSdk.decodeData(encoded);

				validateDecoded(schemaEncoderEasSdk.schema, decodedEasSdk);
				validateDecoded(schemaEncoder.schema, decoded);
				validateDecoded(schemaEncoder.schema, decodedEasSdk);
			},
		);
	});

	describe.each([
		{
			schema: "bool like",
			inputs: [[{ type: "uint8", name: "like", value: true }]],
		},
		{
			schema: "address contractAddress,bool trusted",
			inputs: [
				[
					{
						type: "address",
						name: "contractAddress",
						value: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
					},
					{ type: "uint8", name: "trusted", value: true },
				],
				[
					{
						type: "bytes32",
						name: "contractAddress",
						value: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
					},
					{ type: "bool", name: "trusted", value: false },
				],
			],
		},
		{
			schema: "uint256 id,ipfsHash hash",
			inputs: [
				[
					{ type: "uint128", name: "id", value: 123n },
					{
						type: "ipfsHash",
						name: "hash",
						value:
							"0x55f51668121cf19209d29b2a5a36c34f38c66d65e42135e67e914b6aed448bf7",
					},
				],
				[
					{ type: "uint256", name: "id", value: 0n },
					{
						type: "ipfsHash222",
						name: "hash",
						value:
							"0x778d1b0841d47524bf882bbe8e23993f1cf41ccfaea0769fe5215e7008b10655",
					},
				],
			],
		},
	])(
		"schema type",
		({ schema, inputs }: { schema: string; inputs: any[][] }) => {
			let schemaEncoder: SchemaEncoder;
			let schemaEncoderEasSdk: SchemaEncoderEasSdk;

			beforeEach(() => {
				schemaEncoderEasSdk = new SchemaEncoderEasSdk(schema);
				schemaEncoder = new SchemaEncoder(schema);
			});

			test.for(inputs)("should throw on an invalid type", (params) => {
				expect(() => schemaEncoder.encodeData(params)).to.throw(
					"Incompatible param type",
				);
				expect(() => schemaEncoderEasSdk.encodeData(params)).to.throw(
					"Incompatible param type",
				);
			});
		},
	);

	describe.each([
		{
			schema: "bool like",
			inputs: [[{ type: "bool", name: "counter", value: true }]],
		},
		{
			schema: "address contractAddress,bool trusted",
			inputs: [
				[
					{
						type: "address",
						name: "address",
						value: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
					},
					{ type: "bool", name: "trusted", value: true },
				],
				[
					{
						type: "address",
						name: "contractAddress",
						value: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
					},
					{ type: "bool", name: "liked", value: false },
				],
			],
		},
		{
			schema: "bytes32 eventId,uint8 ticketType,uint32 ticketNum",
			inputs: [
				[
					{
						type: "bytes32",
						name: "id",
						value:
							"0x2bbd66db77a761a69195c2ee81b158a0e15e02d47d4528098ae059e0937b9cf2",
					},
					{ type: "uint8", name: "ticketType", value: 8 },
					{ type: "uint32", name: "ticketNum", value: 100_000 },
				],
				[
					{
						type: "bytes32",
						name: "eventId",
						value:
							"0xcacdee2a5c6a7e013524774dd74ed464ac260e97e6c8d6b5da2ba8d6eb775946",
					},
					{ type: "uint8", name: "type", value: 0 },
					{ type: "uint32", name: "ticketNum", value: 0 },
				],
				[
					{
						type: "bytes32",
						name: "eventId",
						value:
							"0x98f9b0ef313ddecf10200c3943bdd8f2347e151f9ae814a286bde35e323b564d",
					},
					{ type: "uint8", name: "ticketType", value: 255 },
					{ type: "uint32", name: "num", value: 1_000_000 },
				],
			],
		},
	])(
		"invalid name",
		({ schema, inputs }: { schema: string; inputs: any[] }) => {
			let schemaEncoder: SchemaEncoder;
			let schemaEncoderEasSdk: SchemaEncoderEasSdk;

			beforeEach(() => {
				schemaEncoderEasSdk = new SchemaEncoderEasSdk(schema);
				schemaEncoder = new SchemaEncoder(schema);
			});

			test.for(inputs)("should throw on an invalid name", (params) => {
				expect(() => schemaEncoderEasSdk.encodeData(params)).to.throw(
					"Incompatible param name",
				);
				expect(() => schemaEncoder.encodeData(params)).to.throw(
					"Incompatible param name",
				);
			});
		},
	);
});

describe("ipfs", () => {
	test.for(["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR"])(
		"decode",
		(ipfsValue) => {
			expect(SchemaEncoderEasSdk.decodeIpfsValue(ipfsValue)).to.equal(
				"0xc3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a",
			);
			expect(decodeIpfsValue(ipfsValue)).to.equal(
				"0xc3c4733ec8affd06cf9e9ff50ffc6bcd2ec85a6170004bb709669c31de94391a",
			);
		},
	);

	test.each([
		["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", true],
		["QmcRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF", true],

		["AmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR", false],
		["QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsM", false],
		["QaaRD4wkPPi6dig81r5sLj9Zm1gDCL4zgpEj9CfuRrGbzF", false],
	])("CID verification", (cid, expected) => {
		expect(SchemaEncoderEasSdk.isCID(cid)).to.equal(expected);
		expect(SchemaEncoder.isCID(cid)).to.equal(expected);
	});
});
