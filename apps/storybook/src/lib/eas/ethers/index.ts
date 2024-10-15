// TODO stays for storkbook while remove from package

import {
	BrowserProvider,
	ethers,
	JsonRpcProvider,
	JsonRpcSigner,
} from "ethers";
import {
	createWalletClient,
	type Account,
	type Chain,
	type Client,
	type Transport,
} from "viem";

// TODO temp workaround
// use alchemy rpc for more stable testing

export const createEthersSigner = (privateKey: string, chainId: number) => {
	const provider = new JsonRpcProvider(
		"https://eth-sepolia.g.alchemy.com/v2/ehwSFhNwiBq90e7nu_4QAGNYBiZlfkk6",
	);

	// Connect to the Ethereum network

	return new ethers.Wallet(privateKey, provider);
};
