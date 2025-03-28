// This deo

import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

import { createLogger } from "@mastra/core/logger";
import { Mastra } from "@mastra/core/mastra";

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
