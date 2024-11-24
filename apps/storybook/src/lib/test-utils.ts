import {
	BrowserProvider,
	JsonRpcProvider,
	JsonRpcSigner,
	ethers,
} from "ethers";
import { http } from "viem";
import {
	type Account,
	type Chain,
	type Client,
	type Transport,
	createWalletClient,
} from "viem";
import { sepolia } from "viem/chains";
import { getAlchemyEndpoint } from "./alchemy";

// using default rpc often leads to error such as  `InvalidInputRpcError` or `transaction underpriced`
export const createTestClientConfig = (overrides?: any) => {
	const chain = overrides?.chain || sepolia;
	return {
		chain,
		transport: http(getAlchemyEndpoint(chain.id)),
		...(overrides || {}),
	};
};

export const createTestEthersSigner = (
	privateKey: string,
	chainId: number = sepolia.id,
) => {
	const provider = new JsonRpcProvider(getAlchemyEndpoint(chainId));

	return new ethers.Wallet(privateKey, provider);
};
