import { Hex } from "@repo/domain/signature/sign";
import { signMessage } from "@wagmi/core";
import * as typed from "micro-eth-signer/typed-data";
import {
	EIP712Domain,
	GetType,
	TypedData,
	signTyped,
} from "micro-eth-signer/typed-data";
import { useEffect, useRef, useState } from "react";
import { useAccount, useConfig, useSignMessage } from "wagmi";

// https://www.npmjs.com/package/@noble/secp256k1
// EIP-191
export const signMessageRaw = async (privateKey: Hex, message: string) => {
	console.log("signMessageRaw", privateKey, message);
	// const msgHash = sha256(message);
	// sha256 of 'hello world'

	const signature = typed.personal.sign(message, privateKey);
	return signature as Hex;
};

// EIP712
export const signEIP712MessageRaw = async (privateKey: Hex, typedData: any) => {
	// fix type of EIP712Domain

	const signature = signTyped(typedData, privateKey);
	return signature as Hex;
};
