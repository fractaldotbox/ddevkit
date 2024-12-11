// Note test case at https://github.com/storacha/w3up/blob/main/packages/w3up-client/test/client.test.js

import { Client, create } from "@web3-storage/w3up-client";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import * as Proof from "@web3-storage/w3up-client/proof";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";
import { base32 } from "multiformats/bases/base32";
import * as Link from "multiformats/link";
import { createPendingTransactionFilter } from "viem/actions";
import { beforeAll, describe, expect, test } from "vitest";
import { authWithEmail } from "./isomorphic";
const STORACHA_KEY = process.env.VITE_STORACHA_KEY!;
const STORACHA_EMAIL = process.env.VITE_STORACHA_EMAIL!;
const STORACHA_PROOF = process.env.VITE_STORACHA_PROOF!;

// https://github.com/storacha/w3up/issues/1591
// required at nodejs, no issue at browser
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
import { CID } from "multiformats/cid";
//@ts-ignore
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

describe(
	"storacha",
	() => {
		test("createSpace", async () => {
			const client = await create();
			const space = await client.createSpace("my-awesome-space");
			console.log("space", space);
		});
		let client: Client;

		beforeAll(async () => {
			const principal = Signer.parse(STORACHA_KEY!);
			const store = new StoreMemory();
			client = await create({ principal, store });
			const proof = await Proof.parse(STORACHA_PROOF);
			const space = await client.addSpace(proof);
			await client.setCurrentSpace(space.did());
		});

		test.skip("createSpace with credentials", async () => {
			const space = await client.createSpace("my-awesome-space");
			console.log("space", space);
		});

		test("#get", async () => {
			const cidString =
				"bafybeifpiqvtu3tpmqtefd7dpx2dkcjorfwwn3mdhpqpb3egmbthjr57ua";
			const cid = CID.parse(cidString, base32.decoder);
			console.log(cid);
			const results = await client.capability.upload.get(cid);
			expect(cidString).toBe(results.root.toString());
		});

		test("list files", async () => {
			// Unknown type, must be binary type
			// Note this requires Claim {"can":"upload/list"}
			await client.capability.upload.list({
				cursor: "",
				size: 25,
			});
		});
	},
	60 * 1000,
);
