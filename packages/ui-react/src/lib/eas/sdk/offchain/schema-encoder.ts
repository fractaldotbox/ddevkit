import {
	AbiCoder,
	FunctionFragment,
	encodeBytes32String,
	isBytesLike,
} from "ethers";
import { CID, type MultihashDigest } from "multiformats";
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

export class SchemaEncoder {
	public schema: SchemaItemWithSignature[];

	constructor(schema: string) {
		this.schema = [];

		const fixedSchema = schema.replace(/ipfsHash/g, "bytes32");
		const fragment = FunctionFragment.from(`func(${fixedSchema})`);

		// The following verification will throw in case of an incorrect schema
		AbiCoder.defaultAbiCoder().getDefaultValue(fragment.inputs);

		for (const paramType of fragment.inputs) {
			const { name, arrayChildren } = paramType;

			let { type } = paramType;
			let signature = name ? `${type} ${name}` : type;
			const signatureSuffix = name ? ` ${name}` : "";
			let typeName = type;

			const isArray = arrayChildren;
			const components =
				paramType.components ?? arrayChildren?.components ?? [];
			const componentsType = `(${components.map((c) => c.type).join(",")})${isArray ? "[]" : ""}`;
			const componentsFullType = `(${components.map((c) => (c.name ? `${c.type} ${c.name}` : c.type)).join(",")})${
				isArray ? "[]" : ""
			}`;

			if (type.startsWith(TUPLE_TYPE)) {
				type = componentsType;
				signature = `${componentsFullType}${signatureSuffix}`;
			} else if (type === TUPLE_ARRAY_TYPE) {
				type = `${componentsType}[]`;
				signature = `${componentsFullType}[]${signatureSuffix}`;
			} else if (type.includes("[]")) {
				typeName = typeName.replace("[]", "");
			}

			const singleValue = SchemaEncoder.getDefaultValueForTypeName(typeName);

			this.schema.push({
				name,
				type,
				signature,
				value: type.includes("[]") ? [] : singleValue,
			});
		}
	}

	public encodeData(params: SchemaItem[]): string {
		if (params.length !== this.schema.length) {
			throw new Error("Invalid number or values");
		}

		const data = [];

		for (const [index, schemaItem] of this.schema.entries()) {
			const { type, name, value } = params[index];
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

			data.push(
				schemaItem.type === "bytes32" && schemaItem.name === "ipfsHash"
					? SchemaEncoder.decodeIpfsValue(value as string)
					: schemaItem.type === "bytes32" &&
							typeof value === "string" &&
							!isBytesLike(value)
						? encodeBytes32String(value)
						: value,
			);
		}

		return AbiCoder.defaultAbiCoder().encode(this.signatures(), data);
	}

	public decodeData(data: string): SchemaDecodedItem[] {
		const values = AbiCoder.defaultAbiCoder()
			.decode(this.signatures(), data)
			.toArray();

		return this.schema.map((s, i) => {
			const fragment = FunctionFragment.from(`func(${s.signature})`);

			if (fragment.inputs.length !== 1) {
				throw new Error(`Unexpected inputs: ${fragment.inputs}`);
			}

			let value = values[i];
			const input = fragment.inputs[0];
			const components =
				input.components ?? input.arrayChildren?.components ?? [];

			if (
				value.length > 0 &&
				typeof value !== "string" &&
				components?.length > 0
			) {
				if (Array.isArray(value[0])) {
					const namedValues = [];

					for (const val of value) {
						const namedValue = [];
						const rawValues = val
							.toArray()
							.filter((v: unknown) => typeof v !== "object");

						for (const [k, v] of rawValues.entries()) {
							const component = components[k];

							namedValue.push({
								name: component.name,
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
					const rawValues = value.filter((v: unknown) => typeof v !== "object");

					for (const [k, v] of rawValues.entries()) {
						const component = components[k];

						namedValue.push({
							name: component.name,
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

	public isEncodedDataValid(data: string) {
		try {
			this.decodeData(data);

			return true;
		} catch (e) {
			return false;
		}
	}

	public static isCID(cid: string) {
		try {
			CID.parse(cid);
			return true;
		} catch {
			return false;
		}
	}

	public static encodeQmHash(hash: string): string {
		const a = CID.parse(hash);
		return AbiCoder.defaultAbiCoder().encode(["bytes32"], [a.multihash.digest]);
	}

	public static decodeQmHash(bytes32: string): string {
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

	public static getDefaultValueForTypeName(typeName: string) {
		return typeName === "bool"
			? false
			: typeName.includes("uint")
				? "0"
				: typeName === "address"
					? ZERO_ADDRESS
					: "";
	}

	public static decodeIpfsValue(val: string) {
		if (isBytesLike(val)) {
			return SchemaEncoder.encodeBytes32Value(val);
		}

		try {
			const decodedHash = CID.parse(val);
			const encoded = AbiCoder.defaultAbiCoder().encode(
				["bytes32"],
				[decodedHash.multihash.digest],
			);

			return encoded;
		} catch {
			return SchemaEncoder.encodeBytes32Value(val);
		}
	}

	public static encodeBytes32Value(value: string) {
		try {
			AbiCoder.defaultAbiCoder().encode(["bytes32"], [value]);
			return value;
		} catch (e) {
			return encodeBytes32String(value);
		}
	}

	public signatures() {
		return this.schema.map((i) => i.signature);
	}
}
