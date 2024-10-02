// ECDSA signatures over secp256k1

import { sha256 } from '@noble/hashes/sha256';
import { useEffect, useRef, useState } from 'react';
import { useAccount, useConfig, useSignMessage } from 'wagmi';
import { signMessage } from '@wagmi/core'

import * as typed from 'micro-eth-signer/typed-data';
export type Hex = `0x${string}`;


// https://www.npmjs.com/package/@noble/secp256k1
export const signMessageRaw = async (privateKey: Hex, message: string) => {
    console.log('signMessageRaw', privateKey, message)
    // const msgHash = sha256(message);
    // sha256 of 'hello world'


    const signature = typed.personal.sign(message, privateKey);
    return signature as Hex;
};


