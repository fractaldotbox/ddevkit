import { create } from "@web3-storage/w3up-client";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import * as Proof from "@web3-storage/w3up-client/proof";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";
import type { ServiceConf, Service } from "@web3-storage/w3up-client/types";
import { connect } from "@ucanto/client";
import { CAR, HTTP } from "@ucanto/transport";
import type { ConnectionView, Principal } from "@ucanto/interface";
import * as DID from "@ipld/dag-ucan/did";

// enable sync methods
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
//@ts-ignore
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

// @w3ui use indexed DB with unextractable `CryptoKey`s.
// https://github.com/storacha/w3ui/blob/main/packages/core/src/index.ts#L69

export const createClient = async (options: any) => {
	const store = new StoreMemory();

	const client = await create({
		...options,
		store,
	});
	return client;
};

export const authWithEmail = async (client: any, email: string) => {
	const account = await client.login(email);

	console.log("account", account);
	return account;
};
