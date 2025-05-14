---
title: Introduction - dDevKit
---

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

Learn more about the motivations of [Build your own library](/build-your-own-library.md) and [architecture design](/design/architecture). 


### When to use
- You look for working, generic components with minimum dependencies to further customize
- You're using LLM to generate codebase for web3
- If you want support and maximium compatability with latest features of particular ecosystem, check out official sdks 

## Acknolwedgement
- Thanks shadcn released with MIT license to make this possible
- Thank you for contribution by the communtiy at Gitcoin Grants 22 & 23