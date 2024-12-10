// Note test case at https://github.com/storacha/w3up/blob/main/packages/w3up-client/test/client.test.js

import { create } from "@web3-storage/w3up-client";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import * as Proof from "@web3-storage/w3up-client/proof";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";
import { createPendingTransactionFilter } from "viem/actions";
import { describe, test } from "vitest";
import { authWithEmail } from "./isomorphic";
const STORACHA_KEY = process.env.VITE_STORACHA_KEY!;
const STORACHA_EMAIL = process.env.VITE_STORACHA_EMAIL!;

// https://github.com/storacha/w3up/issues/1591
// required at nodejs, no issue at browser
import * as ed from "@noble/ed25519";
import { sha512 } from "@noble/hashes/sha512";
//@ts-ignore
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

// `w3 delegation create -c 'store/*' -c 'upload/*' <di> --base64`
const STORACHA_PROOF =
	"mAYIEAJQREaJlcm9vdHOAZ3ZlcnNpb24B0wYBcRIgiKHD82ORDwioR+/G+2rFfGAWURBFaijXc1MISD1YsNioYXNYRO2hA0CQoF5bR28q9pQwvuY04vhL/QXHdYFf9LSHw49ltV4gluQ8gHUnhX88wZ7eVYRVY+S1Onq1GCygjABr5zw9DLsGYXZlMC45LjFjYXR0iKJjY2FuZ3NwYWNlLypkd2l0aHg4ZGlkOmtleTp6Nk1rdUxGUU50VnlySFpMSHVUWFJiMWE3cmp3VVl4SkttZkdTbURYY2dLcW5SVUKiY2NhbmZibG9iLypkd2l0aHg4ZGlkOmtleTp6Nk1rdUxGUU50VnlySFpMSHVUWFJiMWE3cmp3VVl4SkttZkdTbURYY2dLcW5SVUKiY2NhbmdpbmRleC8qZHdpdGh4OGRpZDprZXk6ejZNa3VMRlFOdFZ5ckhaTEh1VFhSYjFhN3Jqd1VZeEpLbWZHU21EWGNnS3FuUlVComNjYW5nc3RvcmUvKmR3aXRoeDhkaWQ6a2V5Ono2TWt1TEZRTnRWeXJIWkxIdVRYUmIxYTdyandVWXhKS21mR1NtRFhjZ0txblJVQqJjY2FuaHVwbG9hZC8qZHdpdGh4OGRpZDprZXk6ejZNa3VMRlFOdFZ5ckhaTEh1VFhSYjFhN3Jqd1VZeEpLbWZHU21EWGNnS3FuUlVComNjYW5oYWNjZXNzLypkd2l0aHg4ZGlkOmtleTp6Nk1rdUxGUU50VnlySFpMSHVUWFJiMWE3cmp3VVl4SkttZkdTbURYY2dLcW5SVUKiY2NhbmpmaWxlY29pbi8qZHdpdGh4OGRpZDprZXk6ejZNa3VMRlFOdFZ5ckhaTEh1VFhSYjFhN3Jqd1VZeEpLbWZHU21EWGNnS3FuUlVComNjYW5ndXNhZ2UvKmR3aXRoeDhkaWQ6a2V5Ono2TWt1TEZRTnRWeXJIWkxIdVRYUmIxYTdyandVWXhKS21mR1NtRFhjZ0txblJVQmNhdWRYIu0BGmtPm54lsDPFIPZV2qLwIntwTAZXoUKqcD2CnscfjZ1jZXhwGmkpcVhjZmN0gaFlc3BhY2WhZG5hbWVkdGVzdGNpc3NYIu0B3RODRLWPtlrizRKk3BzNLG8cKHIsqfZGGGkpkleG9BBjcHJmgNMGAXESIIihw/NjkQ8IqEfvxvtqxXxgFlEQRWoo13NTCEg9WLDYqGFzWETtoQNAkKBeW0dvKvaUML7mNOL4S/0Fx3WBX/S0h8OPZbVeIJbkPIB1J4V/PMGe3lWEVWPktTp6tRgsoIwAa+c8PQy7BmF2ZTAuOS4xY2F0dIiiY2NhbmdzcGFjZS8qZHdpdGh4OGRpZDprZXk6ejZNa3VMRlFOdFZ5ckhaTEh1VFhSYjFhN3Jqd1VZeEpLbWZHU21EWGNnS3FuUlVComNjYW5mYmxvYi8qZHdpdGh4OGRpZDprZXk6ejZNa3VMRlFOdFZ5ckhaTEh1VFhSYjFhN3Jqd1VZeEpLbWZHU21EWGNnS3FuUlVComNjYW5naW5kZXgvKmR3aXRoeDhkaWQ6a2V5Ono2TWt1TEZRTnRWeXJIWkxIdVRYUmIxYTdyandVWXhKS21mR1NtRFhjZ0txblJVQqJjY2FuZ3N0b3JlLypkd2l0aHg4ZGlkOmtleTp6Nk1rdUxGUU50VnlySFpMSHVUWFJiMWE3cmp3VVl4SkttZkdTbURYY2dLcW5SVUKiY2Nhbmh1cGxvYWQvKmR3aXRoeDhkaWQ6a2V5Ono2TWt1TEZRTnRWeXJIWkxIdVRYUmIxYTdyandVWXhKS21mR1NtRFhjZ0txblJVQqJjY2FuaGFjY2Vzcy8qZHdpdGh4OGRpZDprZXk6ejZNa3VMRlFOdFZ5ckhaTEh1VFhSYjFhN3Jqd1VZeEpLbWZHU21EWGNnS3FuUlVComNjYW5qZmlsZWNvaW4vKmR3aXRoeDhkaWQ6a2V5Ono2TWt1TEZRTnRWeXJIWkxIdVRYUmIxYTdyandVWXhKS21mR1NtRFhjZ0txblJVQqJjY2FuZ3VzYWdlLypkd2l0aHg4ZGlkOmtleTp6Nk1rdUxGUU50VnlySFpMSHVUWFJiMWE3cmp3VVl4SkttZkdTbURYY2dLcW5SVUJjYXVkWCLtARprT5ueJbAzxSD2Vdqi8CJ7cEwGV6FCqnA9gp7HH42dY2V4cBppKXFYY2ZjdIGhZXNwYWNloWRuYW1lZHRlc3RjaXNzWCLtAd0Tg0S1j7Za4s0SpNwczSxvHChyLKn2RhhpKZJXhvQQY3ByZoDWAwFxEiDMX3iqmG33ZCxEltYoFjvKfGPbHNEl0bO0g2RCqo3jdKhhc1hE7aEDQFspLQBGPEz5iy9CyJLalQi//EE3mE4Huxcqe7Xk6y1CKJU25V/bgrWTfNui2HO+e962Jd1jIryOkIc8acJ8LAxhdmUwLjkuMWNhdHSComNjYW5nc3RvcmUvKmR3aXRoeDhkaWQ6a2V5Ono2TWt1TEZRTnRWeXJIWkxIdVRYUmIxYTdyandVWXhKS21mR1NtRFhjZ0txblJVQqJjY2FuaHVwbG9hZC8qZHdpdGh4OGRpZDprZXk6ejZNa3VMRlFOdFZ5ckhaTEh1VFhSYjFhN3Jqd1VZeEpLbWZHU21EWGNnS3FuUlVCY2F1ZFgi7QHdE4NEtY+2WuLNEqTcHM0sbxwociyp9kYYaSmSV4b0EGNleHD2Y2ZjdIGhZXNwYWNloWRuYW1lZHRlc3RjaXNzWCLtARprT5ueJbAzxSD2Vdqi8CJ7cEwGV6FCqnA9gp7HH42dY3ByZoLYKlglAAFxEiCIocPzY5EPCKhH78b7asV8YBZREEVqKNdzUwhIPViw2NgqWCUAAXESIIihw/NjkQ8IqEfvxvtqxXxgFlEQRWoo13NTCEg9WLDY";

describe("storacha", () => {
	test("createSpace", async () => {
		const client = await create();
		const space = await client.createSpace("my-awesome-space");
		console.log("space", space);
	});

	test.skip("createSpace with credentials", async () => {
		const principal = Signer.parse(STORACHA_KEY!);
		const store = new StoreMemory();
		const client = await create({ principal, store });
		const space = await client.createSpace("my-awesome-space");
		console.log("space", space);
	});

	test("parse proof of space", async () => {
		const principal = Signer.parse(STORACHA_KEY!);
		const store = new StoreMemory();
		const client = await create({ principal, store });
		const proof = await Proof.parse(STORACHA_PROOF);
		const space = await client.addSpace(proof);
		console.log("space", space);
	});
});
