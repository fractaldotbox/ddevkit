import got from "got";
import lighthouse from "@lighthouse-web3/sdk";
import { Account, Hex, createWalletClient, http } from "viem";
import { privateKeyToAccount, signMessage } from "viem/accounts";
import { filecoinCalibration, sepolia } from "viem/chains";
import kavach from "@lighthouse-web3/kavach";
import { writeFileSync } from "fs";
import { DealParameters } from "@lighthouse-web3/sdk/dist/types";
// import { CID } from 'multiformats/cid'

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
		apiKey: string;
	};
}): Promise<[string, string, string]> => {
	const { apiKey } = options;

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
		throw new Error("authMessage error" + error);
	}

	return client.signMessage({
		account,
		message: message,
	});
};

// Api design issue cannot pass callback when deal params not specified

// Further work overriding sdk required for customizing form headers, timeout etc
// consider direct invoke /api/v0/add?wrap-with-directory

const uploadFile = async (
	file: File,
	apiKey: string,
	progressCallback: any,
) => {
	// const dealParams: DealParameters = {};
	const output = await lighthouse.upload(
		file,
		apiKey,
		undefined,
		progressCallback,
	);
	console.log("File Status:", output);

	console.log(
		"Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash,
	);
};

export const retrievePoDsi = async (cid: string) => {
	// const results = await lighthouse.posdi(cid);
	// console.log('results', results);
	// return results?.data;

	let response = await got.get(`${LIGHTHOUSE_API_ROOT}/get_proof`, {
		searchParams: {
			cid,
			network: "testnet", // Change the network to mainnet when ready
		},
	});
	return JSON.parse(response.body);
};

// .uploadText has no deal params options

// const dealParams = {
//     num_copies: 2, // Number of backup copies
//     repair_threshold: 28800, // When a storage sector is considered "broken"
//     renew_threshold: 240, // When your storage deal should be renewed
//     miner: ["t017840"], // Preferred miners
//     network: "calibration", // Network choice
//     deal_duration: 1,
//     add_mock_data: 2, // Mock data size in MB
// };
export const uploadText = async (text: string, apiKey: string) => {
	if (!text) {
		throw new Error("Empty text");
	}

	const response = await lighthouse.uploadText(text, apiKey);

	const { data } = response;

	return {
		name: data.Name,
		cid: data.Hash,
		size: parseInt(data.Size, 10),
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

export const getFile = async (cid: string) => {
	return got("https://gateway.lighthouse.storage/ipfs/" + cid).buffer();
};
