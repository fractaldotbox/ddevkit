---
title: Build your own library
---


## Overview

We want to make it easy to tailor-made your own library for your dApps/agent by generating from common receipes and mixing UNIX-style packages. 

## Why?

Providing building blocks to create customized headless library help us

- Be Open Code and AI-ready
- Improves Frameworks and library compatability
- Secures Supply Chain by minimizing dependencies & boilerplates


### Be Open Code and AI-ready
More code are written by AI than ever. Shadcn advocated [Open Code and AI-ready](https://ui.shadcn.com/docs) where components can be easily worked with by LLM tools. Shadcn provides modular headless, inter-operable, higher-level, battle-tested components, which depends on radix the unstyled, customizable functional primitives and tailwind based design systems. LLM is then able to provide well structured, maintanble output.

Analogus to above, ddevkit aims to create high level building blocks & working receipes, 
to harness high quality libraries and empower LLM to generate structured, integrated, working codebase for developers to prompt and maintain. 


---

### Improves Frameworks and library compatability
We've seen this again and again in web3 --- Numerous codebase got both ethers v5 and viem on explicit handling. With infra-specific templates devs often spend time tweaking typescript build config, packages version conflict integrating a ecosystems to codebase.


### Secures Supply Chain by minimizing dependencies & boilerplates
- Read [dependencies.md]
- We should take advantage of principles and effort of [UnixJs](https://unjs.io/) and [e18e](https://e18e.dev/) as in the wider javascript ecosystems to use small, perfomant packages.

---

## Context of dApps 
In Web3, there is an abundance of templates curated by various infra providers, mostly nextjs/tailwind based. Each boilerplates has different flavours from styling libraries, build process to choices of package manager. 

Headless components (as in shadcn) that are decoupled form styling with minimized dependencies serve as canonical module that work out of the box as much as possible. Single template to rule them all integrating different infrastructure with cli and tested receipes.


<!-- - `graphql-request` to genearte typed-safe graphql for ENS, EAS, Open source observer without use of sdk. -->


## Context of Agents

Decentralized agent often has its own runtime and codebase. Typically agents are equipped with tools in different fasions, such as 

1. Included in agent runtime as plugin
1. Externalized with MCP (Model Context Protocol). 
1. Invoking another agent in swarm architecture via verifiable messaging layer, such as these examples implemented at [Autogen](
https://microsoft.github.io/autogen/0.2/docs/Use-Cases/agent_chat/#diverse-applications-implemented-with-autogen
). 

This imply each agents are on different versions of sdk to interact with protocol. Compared to single "official" dApp controlled by single team, environments of agent is much more diversed.

The fragmentation is reinforced by increasing number of agent frameworks, each maintaining its own version of standalone boilerplate "adapter", such as framework-plugin-aave for yield farming on Aave.

 Common issues find by Developers
- module loading (commonjs/esm)
- dependencies version conflicts
- lack of long-term maintence commitment.
- 3rd-party plugins as source of supply chain attack vector
- 3rd-party plugins as inflexiblility and [leaky abstraction](https://en.wikipedia.org/wiki/Leaky_abstraction), e.g. hard to customize error handling or response data structure

Examples include 
- cdp agenkit requires [ethers v5 to support aave](https://github.com/coinbase/agentkit/issues/323)
- Plugin for Storacha is highly similar at Eliza OS and CDP agentkit while effort is spent on commonjs handling.   
- `viem` code adapters at [goat-sdk](https://github.com/goat-sdk/goat/blob/main/typescript/packages/wallets/viem/src/ViemEVMWalletClient.ts
), [agentkit](https://github.com/coinbase/agentkit/blob/main/typescript/agentkit/src/wallet-providers/viemWalletProvider.ts) can be generated and streamlined per application need 

We argue the problem is often application specific and it's most effective for developers 
to take control and generate with LLM the desired adapters and capabilities for the agent, base on a well-documented canonical set of working receipes & libraries codebase. 

Regardless agent framework or execution environment (e.g. TEE) in use, dependencies is minimized to avoid duplication and supply chain vulenerability.




## Usage

- Using Cli  to install utils and LLM to generate with building blocks.

Streamline by deeper integration


with a simple rpc , able to generate corresponding.



<!-- For good or for the worse, there are too many frameworks in both web2 and web3, dApp or agents. -->






<!-- 
Start with some sensible defaults, then customize the components to your needs.

Easy to Style: One of the drawbacks of packaging the components in an npm package is that the style is coupled with the implementation. The design of your components should be separate from their implementation.

Secure: Avoid supply chain attack

Faster: Build size is generally not the major concern given treeshaking at modern ESM, but we avoid duplications at various depenedencies such as having both jotai and zustand.
 -->



<!-- We try to create headless, generic dApp components and agent utils that work well across different ecosystems.  
Besides decoupling style and implementation as in shadcn, the bigger motivation is to support developing dApp and decentralized agents that are trustless, autonomous, secured from supply chain attacks with minimal dependencies.

With Open Code we make it AI-ready and provide reasonable defaults allowing one to extend per need, enabling agents generating and iterating its own codebase.  -->






## Common 

- own graphql impl
