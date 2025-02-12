---
title: Data handling
---


# Data sources and types

## Graphql
- it's challenging to manage schemas & related rate limit for multiple servers
 - https://docs.ens.domains/web/subgraph#the-graph
- currently we consolidate graphql generation and types under `packages/graphql` instead of workspace level
- opted for string [documentMode](https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#when-to-use-a-string-documentmode
) for smaller bundle size and not using AST on the client (tanstack)
- we will try to modularize and support cli to generate under `@/graphql` 
