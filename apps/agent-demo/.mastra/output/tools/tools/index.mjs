import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const publicClient = createPublicClient({
  // chain: mainnet,
  chain: base,
  transport: http()
});
const rpcBalanceTool = createTool({
  id: "rpc-balance-tool",
  description: "Get details from the blockchain",
  inputSchema: z.object({
    address: z.string().describe("address")
  }),
  outputSchema: z.object({
    balance: z.string()
  }),
  execute: async ({
    context
  }) => {
    console.log("invoke rpc balance tool", context);
    const balance = await publicClient.getBalance({
      address: context.address
    });
    return {
      balance: balance.toString()
    };
  }
});
const rpcTool = createTool({
  id: "rpc-tool",
  description: "send rpc requests to the blockchain",
  inputSchema: z.object({
    method: z.string().describe("method"),
    params: z.array(z.string()).describe("params")
  }),
  outputSchema: z.object({
    data: z.any().describe("returned results")
  }),
  execute: async ({
    context
  }) => {
    console.log("invoke rpc tool", context);
    const data = await publicClient.transport.request({
      ...context
    });
    return {
      data
    };
  }
});

export { publicClient, rpcBalanceTool, rpcTool };
