---
title: On Dependencies
---


## Dependencies considerations

This documents rationale behind opionated dependencies

- `graphql-request` is used with @tanstack query as lightweight fetching. Data are not normalized
   - it is optional to combine with [client from the graph](https://thegraph.com/docs/en/querying/querying-from-an-application/#graph-client) with block tracking, multi-chain subgraphs handling etc. 
- `@graphprotocol/client-cli` is used for artifact generating

- nanostore over jotai over zustand
  - Nanostore is tiny and framework agnostic, recommended by [astro](https://docs.astro.build/en/recipes/sharing-state-islands/), will be used for more basic use cases
  - Jotai more mature and is preferred to zustand although zustand is being used in scaffold. Firstly it is used by shadcn, and it [doesn't use a single store as in zustand](https://zustand.docs.pmnd.rs/getting-started/comparison#jotai)

- vitest over jest
  - used by shadcn, scaffold and generally author find less issues for typscript setup as in jest.

- Currently we use a small set of unix style stable, isomorphic lightweight libraries. To avoid supply chain attacks, we should make versions easily fixed/immutable or configurable to native 
  - `ky` over `fetch` to reduce boilerplates
  - use `URLSearchParams` over `fast-querystring`
  - unjs packages


- We want first class ESM support and thus
  - `vitest` over `jest` for testing 
  - `tsx` over `ts-node` for .mts execution


## Form
- we opt for shadcn form (react-hook-form) instead of radix ui form 

