import { createClient } from "@/lib/filecoin/storacha/isomorphic";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import * as Proof from "@web3-storage/w3up-client/proof";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useEffect, useState } from "react";

export type StorachaInitParams = {
	keyString: string;
	proofString: string;
};

export const initStorachaClient = async ({
	keyString,
	proofString,
}: StorachaInitParams) => {
	const principal = Signer.parse(keyString);
	const client = await createClient({
		principal,
	});

	// Add proof that this agent has been delegated capabilities on the space
	const proof = await Proof.parse(proofString!);
	const space = await client.addSpace(proof);

	return {
		client,
		space,
	};
};

const clientAtom = atom<any>(null);

export const useStorachaClient = ({
	keyString,
	proofString,
}: StorachaInitParams) => {
	const [client, setClient] = useAtom(clientAtom);

	useEffect(() => {
		setClient(initStorachaClient({ keyString, proofString }));
	}, [keyString, proofString]);

	return client;
};

export const parseStorachaResults = () => {
	return {
		cid: "",
	};
};
