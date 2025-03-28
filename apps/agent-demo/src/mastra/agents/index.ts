import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";

import { rpcBalanceTool, rpcTool } from "../tools";

// export const weatherAgent = new Agent({
// 	name: "Weather Agent",
// 	instructions: `
//       You are a helpful weather assistant that provides accurate weather information.

//       Your primary function is to help users get weather details for specific locations. When responding:
//       - Always ask for a location if none is provided
//       - If the location name isn’t in English, please translate it
//       - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
//       - Include relevant details like humidity, wind conditions, and precipitation
//       - Keep responses concise but informative

//       Use the weatherTool to fetch current weather data.
// `,
// 	model: openai("gpt-4o"),
// 	tools: { weatherTool },
// });

export const ethereumAgent = new Agent({
	name: "Ethereum Agent",
	instructions: `
        You are a helpful analyst that provides accurate information on the Ethereum blockchain.
  
        Your primary function is to help users get details by interacting with the chain via rpc. When responding:
        - Always reply with checksumed address
        - Keep responses concise but informative
  
        Use the rpcTool to fetch latest data on the chain about block number, balance etc.
  
  `,
	model: openai("gpt-4o"),
	tools: {
		rpcTool,
		// rpcBalanceTool,
	},
});
