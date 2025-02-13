---
title: Introduction
---


# Geist dApp Kit

This repository consist of

- dApp kit
  - react components designed in shadcn style 
- agent kit
  - plugins designed for various agent frameworks
- utils
  - various utils designed to be isomorphic 


## Design principles

- 🔻 [Minimized dependencies](/dependencies.md)
  - For performance and security. Refers to 
- 🏎 [Optimized and SSR ready.](/ssr.md)
- 🤌 Small. Faster for both user and ci. Cheaper to store. 
- 🔒 Secure. No dynamic script loading. Audited dependencies (TODO) 
- 🕊️ Censorship Resistant. Take explicit control on asset gateway and trust assumptions
- 🌐 Accessible & Localization ready
- ⛓️ Ecosystems, Framework agnostic
- 🙌 Working example. First class Storybook support, avoid outdated documentations. 
- 🚶 Open source. Authors can walkaway. No npm account to secure.


## Overview
- We're creating cookbook instead of libraries and we focus on working, barebone, lightly styled components. It is way easier to identify painpoints and refactor for best architecture, instead of being astronaut architects. 

For now we try to mimic behaviours of common components e.g. what you see on explorers/wallets and we will revisit best UX for each component.


Learn about more about architecture design at [here](/design/architecture). 
