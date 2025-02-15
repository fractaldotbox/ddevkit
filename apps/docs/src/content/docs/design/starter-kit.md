---
title: Starter template
---

## Background


This documents whether we should build a dApp starter template. 

Today for dApp developments there are great starter template like [Scaffold-ETH2] or ecosystems specific ones like `create-filecoin-app`, `create-nillion-app`. They do a great job onboarding new develoeprs.. 

Meanwhile, "vibe coding" is getting popular, one can bootstrap a project by prompting LLM such as replit, v0 or bolt.new


Here by "scaffold" we refers to creating working, customizable project, "generator" for modules generating code for required frameworks and features, incrementally

Composability of scaffold tool is not a new problem (refer to appendix), 
We believe what could improve the situation are 1) unix-style customizable, replaceable, modules/receipes with minimized dependencies and 2) enhancing AI dev tools's ability to test against desired combination of techstack.

In our context where we expect to incrementally add and customize components similiar to shadcn, we aims to create lightweight scaffold template which then alias to execute some importantgeist add <component>  per wizard input, and expect user to follow up the rest 


## Our take

Generally, we optimize for LLM to bootstrap and iterate incrementally. 

Sepcfically, compare to Scaffold-ETH2

1. We offer framework-agnostic, different falvoured recipes and components, where developer/LLM can copy-paste subset of components as standalone application, supporting easy customization as in shadcn. 

We want to be agnostic regarding 
- tooling e.g. yarn is not a must
- FE framework e.g. solid, astro supoprt
- dependencies

2. We don't target inexperienced developers.  More experienced ones might prefer debugging with explorer over wrapper components for read / write contract `useScaffoldReadContract`


### Appendix

- Some history on composability of scaffold tool. 
[Yeoman has made such attempt to design for it ](https://yeoman.io/authoring/composability).However, practically most generator are quite monolitic and opionated, also it is fundamentally hard to test aganist expotential growing combinations of configuraiotions. 
  - Reads
    - [HN:Why is it so hard to write a scaffoling tool](https://news.ycombinator.com/item?id=33079544)
    - [brunch (now deprecated) comparing Yeoman] https://github.com/brunch/brunch/issues/408#issuecomment-8455527
    - Other notable generator framework
      - create-turbo for monorepo setup (https://turbo.build/repo/docs/reference/create-turbo)
      - https://github.com/plopjs/plop (base on inquirer, handlebars) which generates various file e.g. api endpoint as well




## Ecosystems Comparison


| Ecosystem      | AS-IS packages                                                                                                                                                  | NPM Wk Dl | Notes on tooling                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------- |
| general        | wagmi                                                                                                                                                           | 160k      | abitype, viem. use @noble under the hood                                        |
| general        | @noble/curves                                                                                                                                                   | 1.8M      | other utils like secp256k1  (330k)                                              |
| Base           | onchainkit                                                                                                                                                      | 8k        |                                                                                 |
| Stark          | [@starknet-react/core](https://www.npmjs.com/package/@starknet-react/core)                                                                                      | 2k        |                                                                                 |
| XMTP           | [react-xmtp](https://www.google.com/search?q=xmtp-react&oq=xmtp-react&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEIMTY5N2owajGoAgCwAgA&sourceid=chrome&ie=UTF-8) | 2k        |                                                                                 |
| EAS            | [@ethereum-attestation-service/eas-sdk](@ethereum-attestation-service/eas-sdk)                                                                                  | 3k        |                                                                                 |
| ENS            | ensjs, react                                                                                                                                                    |           |                                                                                 |
| Mina           | o1js                                                                                                                                                            | 2k        | [zkapp-cli](https://docs.minaprotocol.com/zkapps/tutorials/zkapp-ui-with-react) |
| MUD            | @latticexyz/react                                                                                                                                               | 3k        |                                                                                 |
| permissionless | permissionless                                                                                                                                                  | 27k       |                                                                                 |
| Superchain     |                                                                                                                                                                 |           |                                                                                 |


### Wagmi
- https://wagmi.sh/react/comparisons#overview