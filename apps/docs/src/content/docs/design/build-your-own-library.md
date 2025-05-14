---
title: Build your own library
---


## Overview

dDevKit makes it easy to build your own library for dApps/agent with optimized building blocks and receipes.

### Why?

Providing building blocks to create customized, headless library help us

- Be Open Code and AI-ready
- Improve Frameworks and library compatability in fragmented ecosystems
- Secures Supply Chain by minimizing dependencies & boilerplates


### Be Open Code and AI-ready

More code are written by AI than ever. Shadcn advocated [Open Code and AI-ready](https://ui.shadcn.com/docs) where components can be easily worked with by LLM tools. Shadcn provides modular headless, inter-operable, higher-level, battle-tested components, which depends on [Radix](https://github.com/radix-ui) the unstyled, customizable functional primitives and tailwind based design systems. LLM is then able to provide well structured, maintanble output.

Analogus to above, dDevKit aims to create high level building blocks & working receipes, 
to curate Ethereum-aligned approaches (e.g. censorship resistance) with high quality libraries (e.g. viem) and empower LLM to generate structured, integrated, working codebase for developers to build applications.. 


---

### Improves Frameworks and library compatability in fragmented ecosystems

We've seen this again and again in web3 --- Numerous codebase got both ethers v5, v6 and viem so as to cater for different upstream libraries.
In the fast-paced blockchain ecosystems, despite numerous templates and examples curated, they are often deprecated quickly and infra-specific. Devs often spend time tweaking typescript build config, packages version conflict in order to integrate with multiple ecosystems.

dDevKit aims to provide receipes with streamline library, also well maintained, tested modules that dev can mix and match easily with AI instead of templates. 


### Secures Supply Chain by minimizing dependencies & boilerplates
- Use of auditable and minmizing dependencies is underrated, and we don't want to "stop using dApps" -- read [dependencies.md] for our considerations and approaches. With rise of frameworks, mcp plugins we should empower the community to use shared components and avoid boilerplate. 
- We should take advantage of principles and effort of [UnixJs](https://unjs.io/) and [e18e](https://e18e.dev/) as in the wider javascript ecosystems to use small, perfomant packages. 

---

## Common painpoints to be solved

### Context of dApps 

In Web3, there is an abundance of templates curated by various infra providers, mostly nextjs/tailwind based. Each boilerplate has different flavours from styling libraries, build process to choices of package manager. Often thare are overlapping and opionated modules such as graphql, caching and usage of ipfs gateway. 

Headless components (as in shadcn) which are decoupled form styling with minimized dependencies serve as sharable canonical modules that can work out of the box as much as possible. We see the pattern beyond UI components but extendable to fullstack, as [permissionless](https://docs.pimlico.io/references/permissionless) serve as middleware that is agnostic to smart accounts, bundlers and paymasters. Curated working, tested receipes integrating different infrastructure will promote maximum resuse.


### Context of Agents

Compared to usually single "official" dApp controlled by single team, environments of agent is much more diversed.

Decentralized agent often has its own runtime, codebase and typically equipped with tools in different fasions, such as 

1. Included in agent runtime as plugin
2. Externalized with MCP (Model Context Protocol). 
3. Invoking another agent in swarm architecture via verifiable messaging layer, such as examples implemented at [Autogen](
https://microsoft.github.io/autogen/0.2/docs/Use-Cases/agent_chat/#diverse-applications-implemented-with-autogen
). 

This implies each agent are on different versions of sdk to interact with protocols.
The fragmentation is reinforced by increasing number of agentic frameworks, each maintaining its own version of standalone boilerplate "adapter", such as framework-plugin-aave for yield farming on Aave.

Common issues find by Developers
- module loading (commonjs/esm)
- dependencies version conflicts
- lack of long-term maintence commitment.
- 3rd-party plugins as source of supply chain attack vector
- 3rd-party plugins as inflexiblility and [leaky abstraction](https://en.wikipedia.org/wiki/Leaky_abstraction), e.g. hard to customize error handling or response data structure

Examples include 
- cdp agenkit requires [ethers v5 to support aave](https://github.com/coinbase/agentkit/issues/323)
- Plugin for Storacha is highly similar at Eliza OS and CDP agentkit, with main effort spent on commonjs handling in order to use ESM based library.   
- `viem` code adapters at [goat-sdk](https://github.com/goat-sdk/goat/blob/main/typescript/packages/wallets/viem/src/ViemEVMWalletClient.ts
), [agentkit](https://github.com/coinbase/agentkit/blob/main/typescript/agentkit/src/wallet-providers/viemWalletProvider.ts) can actually be generated and streamlined per application need 

We argue the problem is often application specific and it's most effective for developers 
to take control and generate with LLM the desired adapters and capabilities for the agent, base on a well-documented canonical set of working receipes & libraries codebase.
In such a way regardless of the agent framework or execution environment (e.g. TEE) in use, dependencies is minimized to avoid duplication and supply chain vulenerability.