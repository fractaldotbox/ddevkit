## Dependencies considerations

This document rational behind opionated dependencies

- `graphql-request` is used with @tanstack query as lightweight fetching. Data are not normalized
   - it is optional to combine with [client from the graph](https://thegraph.com/docs/en/querying/querying-from-an-application/#graph-client) with block tracking, cross-chain subgraphs handling etc. 
- `@graphprotocol/client-cli` is used for artifact generating

- jotai over zustand
  - Jotai is preferred although zustand is being used in scaffold. Firstly it is used by shadcn, and it [doesn't use a single store as in zustand](https://zustand.docs.pmnd.rs/getting-started/comparison#jotai)

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

