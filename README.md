## Geist Dapp Kit

Dapp Components that you or LLM can copy and paste into your apps. Accessible. Customizable. Open Source.
Inspired by [shadcn/ui](https://github.com/shadcn-ui/ui/tree/main)

### Introduction 

This is NOT a component library. It's a collection of re-usable components and receipes that you can copy and paste into your dApps.

We want to create generic dApp components that work well across different ecosystems. 
These components should adapt to common smart contract interfaces. 


Besides decoupling style and implementation as in shadcn, the bigger motivation is to support developing dapp are that are trustless, secure with minimal dependency to particular ecosystems and avoid supply chain attacks. We try to improve DX but the end goal is to support autonomous agents to control and iterate Decentralized, autonomous website with programmable cryptography. 

We try to align conventions with shadcn so `geist` is alias to shadcdn with extra batteries. 
i.e.

`npx geist@latest add context-menu` should work


Read more on the original motivations of [shadcdn](https://ui.shadcn.com/docs)

Dapp needs are quite different and end to end tested flows, not just UI components. Fork instead of adding these into the shadcdn registry.

## Installation

### Frameworks
Next.js

## FAQ

### Why 
Start with some sensible defaults, then customize the components to your needs.

One of the drawbacks of packaging the components in an npm package is that the style is coupled with the implementation. The design of your components should be separate from their implementation.

## Why not using library X?

- Build on top of viem, which has minimum dependency, and @radix for max compatability with shadcn. 

- Opinonated (us) defaults and unopionated extensions  
 - First of all, we use a plugin systems, such that sensible starknetjs could be added easily. Intentionally exclude libraries such as rainbowkit to avoid issues like ledger connect kit. 
- At the end of the day these are code receipes and components, nothing stops anyone to extend with particular component libraries.    
    - These components wont be possible without amazing work at onchainkit, ensjs, react startk etc. Thus we create default opionated way of , also shows receipes if opt for integrating particular 3rd party libraries.
    - Many components are of similar purposes but not interoperable and generally it is hard to achieve consistent styles and integrating multiple fast itearting libraries is often a headache itself. Build size is not the major concern given treeshaking at modern ESM. 

## Which ecosystems are supported
- We focus on Ethereum ecosystems, we prioritize L1 and L2 on OPstack and starknet. 


## How is this different from ScaffoldETH
- ScaffoldETH is great and designed to make it simple for beginners to start from scratch. There are also modular compatabile [extensions](https://docs.scaffoldeth.io/extensions/) one can use. 
- It rightfully uses a [opionated techstack](https://docs.scaffoldeth.io/#scaffold-eth-2-tech-stack). Our focus is to make wagmi, rainbowkit optional and adapt to various styling methods, with a differernt vision of optimizing the library for LLM to iterate the sites.


## Which frameworks are supported
- Currently we focus on React with wagmi, but make it framework agnostic and support solid.js is a goal.
- for web framework, next.js is supported for now. We will try to align what is supported at shadcdn


## What is different in dApp development?
- working examples matters.
- auditable. extraordinary work at cryptography 


## Repository structure
This is the monorepo including documentations and packages released. 


## Acknolwedgement
- Thanks shadcn released with MIT license to make this possible