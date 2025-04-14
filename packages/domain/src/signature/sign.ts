// ECDSA signatures over secp256k1

import { sha256 } from "@noble/hashes/sha256";
import { useEffect, useRef, useState } from "react";

import * as typed from "micro-eth-signer/typed-data";

export type Hex = `0x${string}`;

export enum SignType {
	EIP191 = "EIP191",
	EIP712 = "EIP712",
}

export enum SignAccountType {
	SA = "Smart Account",
	EOA = "EOA",
}
