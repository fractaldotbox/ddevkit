import kavach from "@lighthouse-web3/kavach";
import lighthouse from "@lighthouse-web3/sdk";
import ky from "ky";
import { http, Account, Hex, createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { uploadFiles as uploadFilesLighthouse } from "./browser";
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

export const uploadFile = async (
	file: File,
	apiKey: string,
	progressCallback: any = () => {},
): Promise<any> => {
	const output = await lighthouse.upload(
		file,
		apiKey,
		undefined,
		progressCallback,
	);

	if (window) {
		return await uploadFilesLighthouse({
			files: [file],
			config: {
				accessToken: apiKey,
			},
		});
	}
	console.log("File Status:", output);

	console.log(
		"Visit at https://gateway.lighthouse.storage/ipfs/" + output.data.Hash,
	);

	return {
		name: output.data.Name,
		cid: output.data.Hash,
		size: parseInt(output.data.Size, 10),
	};
};

export const retrievePoDsi = async (cid: string) => {
	// const results = await lighthouse.posdi(cid);
	// console.log('results', results);
	// return results?.data;

	let response = await ky.get(`${LIGHTHOUSE_API_ROOT}/get_proof`, {
		searchParams: {
			cid,
			network: "testnet", // Change the network to mainnet when ready
		},
	});
	const data = await response.json();
	return JSON.parse(data);
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

export const getLighthouseGatewayUrl = (cid: string) => {
	return "https://gateway.lighthouse.storage/ipfs/" + cid;
};

export const retrieveFile = async (cid: string) => {
	return ky(getLighthouseGatewayUrl(cid)).arrayBuffer();
};
