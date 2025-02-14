---
title: Data Fetching and store
---

# Overview

## Data fetching


- In context of dApp, data fetching from RPC is typically managed by [wagmi which use Tanstack Query under the hood]
(https://wagmi.sh/react/guides/tanstack-query). It is generally recommend to reuse that for other queries. 


### Graphql
- `graphql-request` is used with @tanstack query as lightweight fetching. Data are not normalized
   - it is optional to combine with [client from the graph](https://thegraph.com/docs/en/querying/querying-from-an-application/#graph-client) with block tracking, multi-chain subgraphs handling etc. 
- `@graphprotocol/client-cli` is used for artifact generating
- it's challenging to manage schemas & related rate limit for multiple servers
 - https://docs.ens.domains/web/subgraph#the-graph
- currently we consolidate graphql generation and types under `packages/graphql` instead of workspace level
- opted for string [documentMode](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#when-to-use-a-string-documentmode
) for smaller bundle size and not using AST on the client (tanstack)
- we will try to modularize and support cli to generate under `@/graphql` 


## State Store 

- For state management, we explore component-based options (and make React Context optional when possible).

- In context of Web3, it is typical to listen to price feed or latest events. We find it performant and intuitive to use reactive pattern chaining compute graph from Observables and pass to components   



- We prefer `nanostore` over `jotai` over `zustand`
  - Nanostore is tiny, tree-shakable, reactive and framework agnostic, recommended by [astro](https://docs.astro.build/en/recipes/sharing-state-islands/), will be used for more basic use cases
  - Jotai is more mature and is preferred to zustand although zustand is being used in scaffold. Firstly it is used by shadcn, and it [doesn't use a single store as in zustand](https://zustand.docs.pmnd.rs/getting-started/comparison#jotai)

