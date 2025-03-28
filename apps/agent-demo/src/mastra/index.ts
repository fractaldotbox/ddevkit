// This deo

import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";

import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";

import { ethereumAgent } from "./agents";

export const mastra = new Mastra({
	agents: { ethereumAgent },
	logger: createLogger({
		name: "Mastra",
		level: "info",
	}),
});

// const fetchClient = new MastraMCPClient({
// 	name: "fetch",
// 	server: {
// 		command: "docker",
// 		args: ["run", "-i", "--rm", "mcp/fetch"],
// 	},
// });

// 2 modes
// mastra agent->MCP server
// https://mastra.ai/blog/introducing-mastra-mcp
