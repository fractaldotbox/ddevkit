import { faker } from "@faker-js/faker";
import { addr } from "micro-eth-signer";
import { Address, Hex } from "viem";
import config from "./config";

const vitalik = {
  ens: "vitalik.eth",
  address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" as Address,
};

// stable private key
// 0x4E123166e7DfDE7AbA29162Fb3a5c6Af562443D4
const user = {
  privateKey:
    "0x9e0fbda2334ed9a312bfb8c59bbc55f6c059a69fae1a1e818ddcd6c60843375b" as Hex,
  address: "0x8178c9834DDaE72D4fcAB4655bF16bCe9C7bE557",
};

const eas = {
  mockReceipient: {
    address: "0xFD50b031E778fAb33DfD2Fc3Ca66a1EeF0652165" as Address,
  },
};

const filecoinTopHolder = {
  address: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  filAddress: "f1m2swr32yrlouzs7ijui3jttwgc6lxa5n5sookhi",
};

user.address = addr.fromPrivateKey(user.privateKey) as Address;

// mainnet, base https://easscan.org/address/0x1e3de6aE412cA218FD2ae3379750388D414532dc
// https://github.com/ethereum-attestation-service/eas-sdk/blob/master/README.md?plain=1#L123
const easSampleAttester = {
  address: "0x1e3de6aE412cA218FD2ae3379750388D414532dc" as Address,
};

export const BY_USER = {
  vitalik,
  easSampleAttester,
  filecoinTopHolder,
  user,
  eas,
};

export const getRandomAccount = () => {
  return addr.random();
};

export const getRandomAddress = () => {
  return addr.random().address as Address;
};

export const TRANSACTION = {
  VITALIK_DEPOSIT: {
    txnHash:
      "0x31634ddc4975cc9f2c3c6426034fe0ed30163000cd067e80857136ab86dc0a3b",
  },
  VITALIK_TRANSFER: {
    txnHash:
      "0xed46c306a58821dd2dcbc78d7b7af9715c809c71d7a53b0dfc90c42dfdf59b67",
  },
};
