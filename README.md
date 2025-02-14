## Geist dDev Kit

Optimized dApp Components and utils that you or LLM can copy and paste into your apps or agent.  Accessible, Localized. Customizable. Open Source.
Inspired by [shadcn/ui](https://github.com/shadcn-ui/ui/tree/main)

⚠️ This is preview alpha version under active development
## For contributors
- Current approach is to focus on storybook, run `pnpm --filter storybook dev`
  - to identify key challenges and make sensible architecture decisions e.g. graphql
- end-goal is to make each of them copy-paste ready code
  - to be extraced into registry for shadcn cli work

## Design principles
- 🔻 Minimized dependencies, familiar techstack. No `ethers` by default, all in `viem` `wagmi` `permissionless` `radix` `tailwindcss`, user controls the rest.
- 🏎 Optimized and SSR ready. Unified data fetching with unopionated data source, minimized JS
- 🤌 Small. Faster for both user and ci. Cheaper to store. 
- 🔒 Secure. No dynamic script loading. Audited dependencies (TODO) 
- 🕊️ Censorship Resistant. Take explicit control on asset gateway and trust assumptions
- 🌐 Accessible & Localization ready
- ⛓️ Ecosystems, Framework agnostic
- 🙌 Working example. First class Storybook support, avoid outdated documentations. 
- 🚶 Open source. Authors can walkaway. No npm account to secure.

### Introduction 

This is NOT a component library. It's a collection of re-usable components and receipes that you can copy and paste into your dApps.

We want to create generic dApp components that work well across different ecosystems. 
These components should adapt to common smart contract interfaces. 


Besides decoupling style and implementation as in shadcn, the bigger motivation is to support developing dapp that are trustless, secure with minimal dependency to particular ecosystems and avoid supply chain attacks.
This aims to provide reasonable defaults and allow user to extend per need. 
We try to improve DX but the end goal is to support autonomous agents to control and iterate Decentralized, autonomous website with programmable cryptography. 

We try to align conventions with shadcn so `geist` is alias to shadcdn with extra batteries. 
i.e.


## Documentations, Roadmap
- Under [/apps/docs/md/](/apps/docs/md)

## Samlpe usage
- Check out [Hosted Storybook](https://dappkit.geist.network/) for working examples 

## Shadcn

Read more on the original motivations of [shadcdn](https://ui.shadcn.com/docs)

Dapp needs are quite different and end to end tested flows, not just UI components. Fork instead of adding these into the shadcdn registry.


### When to use
- You look for working, generic components with minimum dependencies to further customize
- If you want support and maximium compatability with latest features, go for official sdks that are well maintained. 


## FAQ

### Why 
Start with some sensible defaults, then customize the components to your needs.

Easy to Style: One of the drawbacks of packaging the components in an npm package is that the style is coupled with the implementation. The design of your components should be separate from their implementation.

Secure: Avoid supply chain attack

Faster: Build size is generally not the major concern given treeshaking at modern ESM, but we avoid duplications at various depenedencies such as having both jotai and zustand.

## Why treeshaking is not enough?


## What is different in dApp development?
- The space iterate too fast thus working examples matters. Tools are fragmented are generally do not have sufficient traction.
- Underated, but libraries should be auditable and dependencies should be minimized, as we learnt from ledger connect kit incident. Check out Extraordinary work at by paulmillr at [scure](https://github.com/paulmillr/scure-base).

- "The ecosystem is also continuously evolving, meaning you need to adapt to new improvements or get left behind." Read more on https://wagmi.sh/core/why

## Why not using library X?

- Build on top of viem, which has minimum dependency, and @radix for max compatability with shadcn. 
- We love wagmi and many other web3 libraries depends on it anyway. Thus many, but not all, components depends on @wagmi/core, while we stay framework agnoistic so wagmi is peer dependency for react.
- Regarding data fetching, we try to decouple that with presentation layer, data source
    - wagmi use tanstack query which has adapters to various frameworks.
    - data source can be RPC, the graph or customized.
   

- Opinonated (us) defaults and unopionated extensions  

 - First of all, we support a plugin systems such that libraries sensible to use case like `starknetjs` could be added easily, although we also prefer [scure-starknet](https://github.com/paulmillr/scure-starknet). Libraries such as rainbowkit are intentionally excluded. 
- At its core, we prefer lightweight, framework-agnoistic libraries with minimal context provider such as `jotai` or `permissionless`. Individual choices are documented at Rationale.
- At the end of the day these are code receipes and components, nothing stops anyone to extend with particular component libraries.    
    - These components wont be possible without amazing work at [onchainkit](https://github.com/coinbase/onchainkit), ensjs, [starknet-react](https://github.com/apibara/starknet-react) etc. Thus we create default opionated receipes, also shows side by side methods to opt for integrating particular 3rd party libraries.
    - Most libraries generally included opionated data sources, data fetching, validations and state management/caching dependency. 
    - Best way is to make it a community effort as it also not possible for authors to keep track of latest versions.
    - Many components are of similar purposes (e.g. useAddress) but not interoperable, generally it is hard to achieve consistent styles and integrating multiple fast itearting libraries the dependency hell and outdated documentations are often a headache itself. 


- Ethers and viem compatability
  - often installing both as libraries are still depending ether.js

## Which ecosystems are supported
- We focus on Ethereum ecosystems, we prioritize L1 and L2 on OPstack and starknet.
- Current alpha version is tested on sepolia, optimism sepolia and base sepolia


## How is this different from Scaffold-ETH (or Scaffold-X)
- ScaffoldETH is great and designed to make it simple for beginners to start from scratch. We like every library they use, and of course the team and community. 
- It rightfully uses a [opionated techstack](https://docs.scaffoldeth.io/#scaffold-eth-2-tech-stack) with modular compatabile [extensions](https://docs.scaffoldeth.io/extensions/). 
- Our focus is to optimize and secure production build, to make wagmi, rainbowkit optional and adapt to various styling methods, with a differernt vision of optimizing the library for LLM to iterate the sites.


## Which frameworks are supported
- Currently we focus on React with wagmi, but make it framework agnostic and support solid.js is a goal (reaplcing underlying @radix ui components) .
- for web framework, next.js is supported for now. We will try to align what is supported at shadcdn

## How secure is this package?
Use at your own risk as you should always have been and security is often application specific.
We're not infosec experts and precisely for that reason we do best-effort to align best practices and avoid common pitfalls, and make this open so everyone can point out any risks. We would like to work with auditors.


## Acknolwedgement
- Thanks shadcn released with MIT license to make this possible
- Thank you for contribution

