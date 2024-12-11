// import { createClient } from "@/lib/filecoin/storacha/isomorphic";
// import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
// import * as Proof from "@web3-storage/w3up-client/proof";
// import { FileLike, ProgressStatus } from "@web3-storage/w3up-client/types";
// import { UploadFileParams } from "./UploadForm";

// export type StorachaInitParams = {
// 	keyString: string;
// 	proofString: string;
// };

// export const initStorachaClient = async ({
// 	keyString,
// 	proofString,
// }: StorachaInitParams) => {
// 	const principal = Signer.parse(keyString);
// 	const client = await createClient({
// 		principal,
// 	});

// 	// Add proof that this agent has been delegated capabilities on the space
// 	const proof = await Proof.parse(proofString!);
// 	const space = await client.addSpace(proof);

// 	return {
// 		client,
// 		space,
// 		uploadFile: async ({
// 			file,
// 			uploadProgressCallback,
// 		}: UploadFileParams<{ file: FileLike }>) => {
// 			// Note overrding fetchWithUploadProgress not receiving actual progress
// 			const link = await client.uploadFile(file, {
// 				onUploadProgress: (progress: ProgressStatus) => {
// 					uploadProgressCallback?.({
// 						transferredBytes: progress.loaded,
// 						totalBytes: progress.total,
// 						percent: progress.loaded / progress.total,
// 					});
// 				},
// 			});

// 			// if storacha skip upload for existing file, we need to update proress explicitly
// 			uploadProgressCallback?.({
// 				transferredBytes: link.byteLength,
// 				totalBytes: link.byteLength,
// 				percent: 1,
// 			});
// 			return link;
// 		},
// 	};
// };
