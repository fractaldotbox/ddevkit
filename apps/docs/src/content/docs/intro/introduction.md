---
title: Introduction
---


# dDev Kit

This repository consists of

- dApp Components
  - react components designed in shadcn style 
- Agent Toolkit
  - utilites plugins designed for various agent frameworks
- Utils
  - various utils designed to be isomorphic 

## Design principles

- 🔻 [Minimized dependencies](/design/dependencies)
- 🤖 AI-Ready: Open code for LLMs to read, understand, and improve.
- 🏎 [Optimized and SSR ready.](/guides/ssr)
- 🤌 Small. Faster for both user and ci. Cheaper to store. 
- 🔒 Secure. No dynamic script loading. Audited dependencies (TODO) 
- 🕊️ Censorship Resistant. Take explicit control on asset gateway and trust assumptions
- 🌐 Accessible & Localization ready
- ⛓️ Ecosystems, Framework agnostic
- 🙌 Working example. First class Storybook support, avoid outdated documentations. 
- 🚶 Open source. Authors can walkaway. No npm account to secure.


## Demo

<div style="position: relative; padding-bottom: 62.42774566473989%; height: 0;"><iframe src="https://www.loom.com/embed/0cc7734987c34a4a9ffe1f928396fa22?sid=f4aa37c9-9cdf-4e44-8308-8e58c42ba4c7" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Overview

We follow many of the [principles](https://ui.shadcn.com/docs) of shadcn. 

We try to create headless, generic & interoperable dApp components and agent utils that work well across different ecosystems.  
Besides decoupling style and implementation as in shadcn, the bigger motivation is to support developing dApp and decentralized agents that are trustless, autonomous, secured from supply chain attacks with minimal dependencies. 

With Open Code we make it AI-ready and provide reasonable defaults allowing one to extend per need, enabling agents generating and iterating its own codebase. 

Learn more about the moviations of [Build your own library](/build-your-own-library.md) and [architecture design](/design/architecture). 


### When to use
- You look for working, generic components with minimum dependencies to further customize
- You're using LLM to generate codebase for web3
- If you want support and maximium compatability with latest features of particular ecosystem, check out official sdks 


## FAQ



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
- At its core, we prefer lightweight, framework-agnoistic libraries with minimal context provider such as `nanostore` or `permissionless`. Rational of individual choices are documented at [Dependencies](/design/dependencies)
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
- check [/starter-kit.md]

## Which frameworks are supported
- Currently we focus on React with wagmi, but make it framework agnostic and support solid.js is a goal (reaplcing underlying @radix ui components) .
- for web framework, next.js is supported for now. We will try to align what is supported at shadcdn

## How secure is this package?
Use at your own risk as you should always have been and security is often application specific.
We're not infosec experts and precisely for that reason we do best-effort to align best practices and avoid common pitfalls, and make this open so everyone can point out any risks. We would like to work with auditors.


## Acknolwedgement
- Thanks shadcn released with MIT license to make this possible
- Thank you for contribution

