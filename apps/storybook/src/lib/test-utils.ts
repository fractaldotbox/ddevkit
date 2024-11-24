import { http } from "viem";
import { sepolia } from "viem/chains";

// using default rpc often leads to error such as  `InvalidInputRpcError` or `transaction underpriced`
export const createTestClientConfig = (overrides?: any) => {
	const apiKey = import.meta.env.STORYBOOK_ALCHEMY_API_KEY || "";
	return {
		chain: sepolia,
		transport: http(`https://eth-sepolia.g.alchemy.com/v2/${apiKey}`),
		...(overrides || {}),
	};
};
