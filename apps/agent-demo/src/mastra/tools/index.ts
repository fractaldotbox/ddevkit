import { createTool } from "@mastra/core/tools";
import { z } from "zod";

import { http, type Address, createPublicClient } from "viem";
import { base, mainnet } from "viem/chains";

export const publicClient = createPublicClient({
	// chain: mainnet,
	chain: base,
	transport: http(),
});

export const rpcBalanceTool = createTool({
	id: "rpc-balance-tool",
	description: "Get details from the blockchain",
	inputSchema: z.object({
		address: z.string().describe("address"),
	}),
	outputSchema: z.object({
		balance: z.string(),
	}),
	execute: async ({ context }) => {
		console.log("invoke rpc balance tool", context);

		const balance = await publicClient.getBalance({
			address: context.address as Address,
		});

		return { balance: balance.toString() };
	},
});

export const rpcTool = createTool({
	id: "rpc-tool",
	description: "send rpc requests to the blockchain",
	inputSchema: z.object({
		method: z.string().describe("method"),
		params: z.array(z.string()).describe("params"),
	}),
	outputSchema: z.object({
		data: z.any().describe("returned results"),
	}),
	execute: async ({ context }) => {
		console.log("invoke rpc tool", context);

		const data = await publicClient.transport.request({
			...context,
		});
		return {
			data,
		};
	},
});
