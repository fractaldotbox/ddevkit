/**
 * we keep similar class-based interface as in original sdk for interoperability
 */

import { isCID } from "@geist/domain/codec";
import { CID, MultihashDigest } from "multiformats";
import {
	type AbiFunction,
	type AbiParameter,
	type Hex,
	bytesToHex,
	decodeAbiParameters,
	decodeFunctionData,
	encodeAbiParameters,
	encodeFunctionData,
	hexToString,
	isHex,
	pad,
	parseAbiItem,
	parseAbiParameters,
	stringToHex,
} from "viem";
import { ZERO_ADDRESS } from "#lib/constants";

export type SchemaValue =
	| string
	| boolean
	| number
	| bigint
	| Record<string, unknown>
	| Record<string, unknown>[]
	| unknown[];

export interface SchemaItem {
	name: string;
	type: string;
	value: SchemaValue;
}

export interface SchemaItemWithSignature extends SchemaItem {
	signature: string;
}

export interface SchemaDecodedItem {
	name: string;
	type: string;
	signature: string;
	value: SchemaItem;
}

const TUPLE_TYPE = "tuple";
const TUPLE_ARRAY_TYPE = "tuple[]";

export const encodeBytes32Value = (value: string): Hex => {
	try {
		return encodeAbiParameters(parseAbiParameters("bytes32"), [value as Hex]);
	} catch (e) {
		return stringToHex(value, { size: 32 });
	}
};

export const decodeValue = ({ type, name }: SchemaItem, value: SchemaValue) => {
	if (type === "bytes32") {
		if (name === "ipfsHash") {
			return decodeIpfsValue(value as string);
		}
		if (typeof value === "string" && !isHex(value)) {
			return stringToHex(value, { size: 32 });
		}
	}
	return value;
};

export const decodeIpfsValue = (val: string) => {
	if (typeof val === "string" && val.startsWith("0x")) {
		console.log("hex");
		return encodeBytes32Value(val);
	}

	try {
		const decodedHash = CID.parse(val);

		return encodeAbiParameters(parseAbiParameters("bytes32"), [
			bytesToHex(decodedHash.multihash.digest),
		]);
	} catch {
		return encodeBytes32Value(val);
	}
};

export class SchemaEncoder {
	public schema: SchemaItemWithSignature[];

	constructor(schema: string) {
		this.schema = [];

		const fixedSchema = schema.replace(/ipfsHash/g, "bytes32");

		const params = parseAbiParameters(fixedSchema.replace(/\s\s+/g, " "));

		// // Verify the schema by attempting to encode default values
		// TODO come up with better
		// try {
		// 	encodeAbiParameters(
		// 		params,
		// 		params.map(() => "0x"),
		// 	);
		// } catch (e) {
		// 	console.log("e", e);
		// 	throw new Error("Invalid schema");
		// }

		for (const paramType of params) {
			const { name } = paramType;

			let type = paramType.type;

			// @ts-ignore
			const components = paramType.components || [];

			let signature = name ? `${type} ${name}` : type;
			const signatureSuffix = name ? ` ${name}` : "";
			let typeName = type;

			const isArray = components.length > 0;

			const componentsType = `(${components.map(({ type }: AbiParameter) => type).join(",")})${isArray ? "[]" : ""}`;

			const componentsFullType = `(${components.map(({ name, type }: AbiParameter) => (name ? `${type} ${name}` : type)).join(",")})${
				isArray ? "[]" : ""
			}`;

			let value: any = [];

			if (type.startsWith(TUPLE_TYPE)) {
				type = componentsType;
				signature = `${componentsFullType}${signatureSuffix}`;
			} else if (type === TUPLE_ARRAY_TYPE) {
				type = `${componentsType}[]`;
				signature = `${componentsFullType}[]${signatureSuffix}`;
			} else {
				value = SchemaEncoder.getDefaultValueForTypeName(typeName);
			}

			this.schema.push({
				name: name ?? "",
				type,
				signature,
				value,
			});
		}
	}

	public encodeData(params: SchemaItem[]): Hex {
		if (params.length !== this.schema.length) {
			throw new Error("Invalid number of values");
		}

		const data = [];

		for (const [index, schemaItem] of this.schema.entries()) {
			const { type, name, value } = params[index]!;
			const sanitizedType = type.replace(/\s/g, "");

			if (
				sanitizedType !== schemaItem.type &&
				sanitizedType !== schemaItem.signature &&
				!(sanitizedType === "ipfsHash" && schemaItem.type === "bytes32")
			) {
				throw new Error(`Incompatible param type: ${sanitizedType}`);
			}

			if (name !== schemaItem.name) {
				throw new Error(`Incompatible param name: ${name}`);
			}

			data.push(decodeValue(schemaItem, value));
		}

		return encodeAbiParameters(
			parseAbiParameters(this.signatures().join(",")),
			data,
		);
	}

	public decodeData(data: Hex): SchemaDecodedItem[] {
		const values = decodeAbiParameters(
			parseAbiParameters(this.signatures().join(",")),
			data,
		);

		return this.schema.map((s, i) => {
			const params = parseAbiParameters(s.signature);

			if (params.length !== 1) {
				throw new Error(`Unexpected inputs: ${params}`);
			}

			let value = values[i];
			const input = params[0];
			const components =
				input.components ?? input.arrayChildren?.components ?? [];

			if (value && typeof value !== "string" && components?.length > 0) {
				if (Array.isArray(value)) {
					const namedValues = [];

					for (const val of value) {
						const namedValue = [];
						const rawValues = Array.isArray(val)
							? val.filter((v: unknown) => typeof v !== "object")
							: [val];

						for (const [k, v] of rawValues.entries()) {
							const component = components[k];

							namedValue.push({
								name: component.name ?? "",
								type: component.type,
								value: v,
							});
						}

						namedValues.push(namedValue);
					}

					value = {
						name: s.name,
						type: s.type,
						value: namedValues,
					};
				} else {
					const namedValue = [];
					const rawValues = [value].filter(
						(v: unknown) => typeof v !== "object",
					);

					for (const [k, v] of rawValues.entries()) {
						const component = components[k];

						namedValue.push({
							name: component.name ?? "",
							type: component.type,
							value: v,
						});
					}

					value = {
						name: s.name,
						type: s.type,
						value: namedValue,
					};
				}
			} else {
				value = { name: s.name, type: s.type, value };
			}

			return {
				name: s.name,
				type: s.type,
				signature: s.signature,
				value,
			};
		});
	}

	public isEncodedDataValid(data: Hex) {
		try {
			this.decodeData(data);
			return true;
		} catch (e) {
			return false;
		}
	}

	public static isCID(cid: string) {
		return isCID(cid);
	}

	public static encodeQmHash(hash: string): Hex {
		return this.encodeQmHash(hash);
	}

	public static decodeQmHash(bytes32: Hex): string {
		const digest = Uint8Array.from(Buffer.from(bytes32.slice(2), "hex"));
		const dec: MultihashDigest = {
			digest: digest,
			code: 18,
			size: 32,
			bytes: Uint8Array.from([18, 32, ...digest]),
		};

		const dCID = CID.createV0(dec);
		return dCID.toString();
	}

	private static getDefaultValueForTypeName(typeName: string) {
		return typeName === "bool"
			? false
			: typeName.includes("uint")
				? "0"
				: typeName === "address"
					? ZERO_ADDRESS
					: "";
	}

	private static decodeIpfsValue(val: string) {
		return decodeIpfsValue(val);
	}

	private signatures() {
		return this.schema.map((i) => i.signature);
	}
}
