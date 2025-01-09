import { signMessage } from "@wagmi/core";
import * as typed from "micro-eth-signer/typed-data";
import {
	type EIP712Domain,
	GetType,
	TypedData,
	signTyped,
} from "micro-eth-signer/typed-data";
import { useEffect, useRef, useState } from "react";
import { useAccount, useConfig, useSignMessage } from "wagmi";

import { type atom, useAtom } from "jotai";
import { addr } from "micro-eth-signer";

import { type Hex, SignType } from "@geist/domain/signature/sign";
import { TYPED_DATA } from "@geist/domain/signature/type-data";
import { useMemo } from "react";
import type { Address } from "viem";

const { types, primaryType, domain } = TYPED_DATA;

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

export type VerifySignatureParams = {
	address: Address;
	message: any;
	signature: Hex;
};

// for now couple everything and encapsulate to this hook
export const useSign = ({
	signType,
	privateKey,
	messageAtom,
}: {
	signType: SignType;
	privateKey: Hex;
	messageAtom: ReturnType<typeof atom<string>>;
}): any => {
	const publicKeyAddress = addr.fromPrivateKey(privateKey) as Hex;
	const [message] = useAtom(messageAtom);

	const typedData = useMemo(() => {
		const messageToVerify = {
			...TYPED_DATA.message,
			contents: message,
		};

		const typedData = {
			types,
			primaryType,
			domain: domain as unknown as EIP712Domain,
			message: messageToVerify,
		};
		return typedData;
	}, [signType, message]);

	if (signType === SignType.EIP191) {
		return {
			publicKeyAddress,
			messageToVerify: message,
			signMessage: async (message: string) =>
				signMessageRaw(privateKey, message),
			verifyMessage: async ({
				signature,
				message,
				address,
			}: VerifySignatureParams) => {
				return typed.personal.verify(signature, message, address);
			},
		};
	}

	return {
		publicKeyAddress,
		messageToVerify: typedData,
		signMessage: (message: string) =>
			signEIP712MessageRaw(privateKey, typedData),
		verifyMessage: async ({
			signature,
			message,
			address,
		}: VerifySignatureParams) => {
			return typed.verifyTyped(signature, message, address);
		},
	};
};
