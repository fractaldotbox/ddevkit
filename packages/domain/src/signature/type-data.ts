// From spec https://eips.ethereum.org/EIPS/eip-712
// and fixture from [micro-eth-signer](https://github.com/debuggingfuture/micro-eth-signer/blob/main/test/typed-data.test.js)

import { EIP712Domain } from "micro-eth-signer/typed-data";
import { TypedData } from "viem";

export const EIP721_TYPES = {
	Person: [
		{ name: "name", type: "string" },
		{ name: "wallet", type: "address" },
	],
	Mail: [
		{ name: "from", type: "Person" },
		{ name: "to", type: "Person" },
		{ name: "contents", type: "string" },
	],
};

export const TYPED_DATA = {
	types: {
		EIP712Domain: [
			{ name: "name", type: "string" },
			{ name: "version", type: "string" },
			{ name: "chainId", type: "uint256" },
			{ name: "verifyingContract", type: "address" },
		],
		Person: [
			{ name: "name", type: "string" },
			{ name: "wallet", type: "address" },
		],
		Mail: [
			{ name: "from", type: "Person" },
			{ name: "to", type: "Person" },
			{ name: "contents", type: "string" },
		],
	} as const satisfies TypedData,
	primaryType: "Mail",
	domain: {
		name: "Ether Mail",
		version: "1",
		// not bigint to align viem
		chainId: 1,
		verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
	},
	message: {
		from: { name: "Cow", wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826" },
		to: { name: "Bob", wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB" },
		contents: "Hello, Bob!",
	},
};
