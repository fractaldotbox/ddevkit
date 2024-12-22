import config from "@repo/domain/config";
import {
	BrowserProvider,
	JsonRpcProvider,
	JsonRpcSigner,
	ethers,
} from "ethers";
import { http } from "viem";
import { sepolia } from "viem/chains";
import { getAlchemyEndpoint } from "./alchemy";

// using default rpc often leads to error such as  `InvalidInputRpcError` or `transaction underpriced`
export const createTestClientConfig = (overrides?: any) => {
	const chain = overrides?.chain || sepolia;
	return {
		chain,
		transport: http(getAlchemyEndpoint(chain.id, config.alchemy.apiKey)),
		...(overrides || {}),
	};
};

export const createTestEthersSigner = (
	privateKey: string,
	chainId: number = sepolia.id,
) => {
	const provider = new JsonRpcProvider(
		getAlchemyEndpoint(chainId, config.alchemy.apiKey),
	);

	return new ethers.Wallet(privateKey, provider);
};
