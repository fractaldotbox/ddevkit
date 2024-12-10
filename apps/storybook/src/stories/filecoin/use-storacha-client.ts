import { createClient } from "@/lib/filecoin/storacha/isomorphic";
import { Client } from "@web3-storage/w3up-client";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import * as Proof from "@web3-storage/w3up-client/proof";
import { FileLike, ProgressStatus } from "@web3-storage/w3up-client/types";
import { atom } from "jotai";
import { useAtom } from "jotai/react";
import { useCallback, useEffect, useState } from "react";
import { FileParams } from "./UploadForm";

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
		uploadFile: async ({
			file,
			uploadProgressCallback,
		}: FileParams<FileLike>) => {
			const link = await client.uploadFile(file, {
				// fetchWithUploadProgress: async (url, init) => {
				// 	return ky.put(url, {
				// 		...init,
				// 		// custom progress handler not receiving actual progress
				// 		onDownloadProgress: (progress) => {	}
				// 	})
				// },
				onUploadProgress: (progress: ProgressStatus) => {
					uploadProgressCallback?.({
						transferredBytes: progress.loaded,
						totalBytes: progress.total,
						percent: progress.loaded / progress.total,
					});
				},
			});

			// if storacha skip upload for existing file, we need to update proress explicitly
			uploadProgressCallback?.({
				transferredBytes: link.byteLength,
				totalBytes: link.byteLength,
				percent: 1,
			});
			return link;
		},
	};
};

// For hooks refers to w3ui implementation
// https://github.com/storacha/w3ui/blob/835ea5a2a1476e8480354c680535e16a92e6d79d/packages/react/src/hooks.ts
// TODO use jotai for async hooks to init client in wagmi style

export const parseStorachaResults = () => {
	return {
		cid: "",
	};
};
