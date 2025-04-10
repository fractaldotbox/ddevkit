// ECDSA signatures over secp256k1

import * as typed from "micro-eth-signer/typed-data";
import { EIP712Domain, signTyped } from "micro-eth-signer/typed-data";
export type Hex = `0x${string}`;

// https://www.npmjs.com/package/@noble/secp256k1
// EIP-191
export const signMessageRaw = async (privateKey: Hex, message: string) => {
	const signature = typed.personal.sign(message, privateKey);
	return signature as Hex;
};

export enum SignType {
	EIP191 = "EIP191",
	EIP712 = "EIP712",
}

export enum SignAccountType {
	SA = "Smart Account",
	EOA = "EOA",
}

// EIP712
export const signEIP712MessageRaw = async (privateKey: Hex, typedData: any) => {
	// fix type of EIP712Domain

	const signature = signTyped(typedData, privateKey);
	return signature as Hex;
};
