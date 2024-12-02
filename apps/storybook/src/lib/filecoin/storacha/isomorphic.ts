import { create } from "@web3-storage/w3up-client";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import * as Proof from "@web3-storage/w3up-client/proof";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";

// enable sync methods
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
//@ts-ignore
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

// export const createClient = async () => {
// 	const client = await create();

// 	return client;
// };

export const createClient = async () => {
	const store = new StoreMemory();

	const client = await create({
		store,
	});
	return client;
};

export const authWithEmail = async (client: any, email: string) => {
	const account = await client.login(email);

	console.log("account", account);
	return account;
};
