---
title: On Dependencies
---

## Why Minimize dependencies

> Dependency minimalism (writing software that deliberately tries to have as few dependencies as practical) is a really underrated virtue imo. Every single dependency is a risk that "something will go wrong" during someone's installation process. Installing projects with hundreds of dependencies and walking through errors can be incredibly frustrating.

-- [@VitalikButerin](https://x.com/VitalikButerin/status/1880324753170256005)

The risk is real as we were told ["Stop using dapps"](https://decrypt.co/209804/ledger-library-compromised-with-wallet-drainer) where just one npm package got compromised and supply chain attacks is never new. Every dependency make it harder to audit. 

In the web context, dependencies make the bundle larger and the site slower.  [Island Architecture](https://docs.astro.build/en/concepts/islands/) --  we try to contain comopnents into static ones as plain markups and text when possible, and limit interacitivt to speicifc componenst. This help simplify diff across versions and make a larger chunk of the dApp served by IPFS which is immutable. This also help rendering infrequently updated contnet faster, composing different frameworks in a page and encourages pushing slow operations to the server. Typically, we postpone hydration for components requiring a connected wallet. 

In the context of autonomous agent, a simple package-lock.json is not sufficient to guarantee your agent keep running safely. As dev we are just tired of [https://en.wikipedia.org/wiki/Dependency_hell].

## Our approach

- We prefer downstream dependencies that is treeshakable.
- Consider `lib/filecoin/gateway.ts` `getGatewayUrlWithCid()` as an example, it does not import dependenceis unconditionally or relevavnt ecosystem-specific code are expected to be injected using strategy pattern.


## Dependencies considerations

This documents rationale behind opionated dependencies

- For graphql / store related, refers to [/data.md]

- `vitest` over `jest`
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

