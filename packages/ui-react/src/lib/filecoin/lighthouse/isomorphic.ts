import kavach from "@lighthouse-web3/kavach";
import lighthouse from "@lighthouse-web3/sdk";
import type {
	IFileUploadedResponse,
	IUploadProgressCallback,
} from "@lighthouse-web3/sdk/dist/types";
import ky, { type Progress } from "ky";
import { http, type Account, createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { uploadFiles as uploadFilesLighthouse } from "#lib/filecoin/lighthouse/browser";

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

// Supposedly lighthouse can be treeshake for node/browser, to be validated

export const LIGHTHOUSE_API_ROOT =
	"https://api.lighthouse.storage/api/lighthouse/";

// Consider model as action insteadz
export const createLighthouseParams = async ({
	account,
	options,
}: {
	account: Account;
	options: {
		apiKey?: string;
	};
}): Promise<[string, string, string]> => {
	const { apiKey } = options;
	if (!apiKey) {
		throw new Error("Lighthouse apiKey required");
	}

	const signedMessage = await signAuthMessage(account);
	return [apiKey, account.address, signedMessage];
};

export const signAuthMessage = async (account: any) => {
	const client = createWalletClient({
		account,
		chain: sepolia,
		transport: http(),
	});

	const authMessage = await kavach.getAuthMessage(account.address);

	const { error, message } = authMessage;
	if (error || !message) {
		throw new Error(`authMessage error${error}`);
	}

	return client.signMessage({
		account,
		message: message,
	});
};

// Api design issue cannot pass callback when deal params not specified

// Further work overriding sdk required for customizing form headers, timeout etc
// consider direct invoke /api/v0/add?wrap-with-directory

export const uploadFiles = async (
	files: File[],
	apiKey: string,
	uploadProgressCallback?: (data: Progress) => void,
): Promise<any> => {
	let output: { data: IFileUploadedResponse };
	if (files.length < 1) {
		throw new Error("No files provided");
	}

	if (global.window) {
		output = await uploadFilesLighthouse<false>({
			files: files as File[],
			config: {
				accessToken: apiKey,
			},
			uploadProgressCallback,
		});
	} else {
		// uploadBuffer do not support progress. write to temp dir for now
		const [file] = files as [File];

		const tempDir = os.tmpdir();
		const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
		const tempFilePath = path.join(tempDir, `${uniqueId}-${file.name}`);

		// Write file to temp location
		await fs.writeFile(tempFilePath, Buffer.from(await file.arrayBuffer()));

		output = await lighthouse.upload(
			tempFilePath,
			apiKey,
			undefined,
			(data: IUploadProgressCallback) => {
				if (!uploadProgressCallback) return;
				uploadProgressCallback({
					percent: data.progress,
					transferredBytes: 0,
					totalBytes: 0,
				});
			},
		);
	}

	if (!output?.data?.Hash) {
		throw new Error("Upload failed");
	}

	return {
		name: output.data.Name,
		cid: output.data.Hash,
		size: Number.parseInt(output.data.Size, 10),
	};
};

export const retrievePoDsi = async (cid: string) => {
	const response = await ky.get(`${LIGHTHOUSE_API_ROOT}/get_proof`, {
		searchParams: {
			cid,
			network: "testnet", // Change the network to mainnet when ready
		},
	});
	return await response.json();
};

// .uploadText has no deal params options

export const uploadText = async (text: string, apiKey: string) => {
	if (!text) {
		throw new Error("Empty text");
	}

	const response = await lighthouse.uploadText(text, apiKey);

	const { data } = response;

	return {
		name: data.Name,
		cid: data.Hash,
		size: Number.parseInt(data.Size, 10),
	};
};

export const uploadEncryptedFileWithText = async (
	text: string,
	apiKey: string,
	publicKey: string,
	signedMessage: string,
) => {
	const response = await lighthouse.textUploadEncrypted(
		text,
		apiKey,
		publicKey,
		signedMessage,
	);

	const { data } = response;

	return {
		name: data.Name,
		cid: data.Hash,
	};
};

export const getLighthouseGatewayUrl = (cid: string) => {
	return `https://gateway.lighthouse.storage/ipfs/${cid}`;
};

export const retrieveFile = async (cid: string) => {
	return ky(getLighthouseGatewayUrl(cid)).arrayBuffer();
};
