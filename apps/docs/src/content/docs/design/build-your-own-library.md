---
title: Build your own library
---


## Overview

We want to make it easy to tailor-made your own library for your dApps/agent by generating from common receipes and mixing UNIX-style packages. 

## Why?

Follows the design principles of optimized, secure build with minimized dependencies, building a custom, headless library help us

- Be Open Code and AI-ready
- Improves Frameworks and library compatability
- Style agnoistic
- Secures Supply Chain



### Be Open Code and AI-ready
More code are written by AI then ever. Read Shadcn Open Code and AI-ready on LLM generation. 
It's much easier to start with working receipes to prompt and edit.  

---

### Improves Frameworks and library compatability
We've seen this again and again in web3 --- Numerous codebase got both ethers v5 and viem on explicit handling. With infra-specific templates devs often spend time tweaking typescript build config, packages version conflict integrating a ecosystems to codebase.


---

## Context of dApps 
In Web3, there is an abundance of templates curated by various infra providers, mostly nextjs/tailwind based. Each boilerplates has different flavours from styling libraries, build process to choices of package manager. 

Headless components (as in shadcn) that are decoupled form styling with minimized dependencies serve as canonical module that work out of the box as much as possible. Single template to rule them all integrating different infrastructure with cli and tested receipes.

## Context of Agent
- With decentralized agents, each agent has its own runtime and codebase. This means each could be using different versions of sdk to interact with protocol. Compared to single "official" dApp controlled by single team, we need much better dependencies management to cater for problems in diverse environment such as version conflicts. We should benefit from principles and effort of [UnixJs](https://unjs.io/) and [e18e](https://e18e.dev/) as in the wider javascript ecosystems to use small, perfomant packages.


With increasing number of agent frameworks, we also see the community contribute to the plugin ecosystems , which subject to dependencies version conflicts and ongoing maintence commitment. There plugins invovle many framework boilerplates, arguably a generic canonical set of prompting and schemas can be used to generate desired plugin. 


(aave examples)






<!-- For good or for the worse, there are too many frameworks in both web2 and web3, dApp or agents. -->








<!-- We try to create headless, generic dApp components and agent utils that work well across different ecosystems.  
Besides decoupling style and implementation as in shadcn, the bigger motivation is to support developing dApp and decentralized agents that are trustless, autonomous, secured from supply chain attacks with minimal dependencies.

With Open Code we make it AI-ready and provide reasonable defaults allowing one to extend per need, enabling agents generating and iterating its own codebase.  -->


