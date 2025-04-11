---
title: Repository Structure
---




## Why "Build your own Library"?
 <!-- considerations of some of the [Design principles] -->

We observe these challenges in Web3

- Frameworks and library compatability




### Frameworks and library compatability

 

## Our take

- Our components are designed to work with shadcn, with our custom registry (https://ddev.geist.network).
- For backend, for now you might copy utils manually to avoid installing tailwindcss and we will create dedicated cli.


- We have decoupled `@geist/domain` package for common, non-ecosystem specific logic and types.




### dApps components

  
- As we have plans to (partially) support frameworks other than react, we do not consider wagmi a must and thus we plan to segregate framework specific into `ui-react`, `ui-solid` etc. 

- We try to always decouple the presentation (dump) component from smart components. We support reasonable default but all data fetching / gateway etc should be explicit params at lower level components. 
- note we don't have different styles of component
- domain package
- We try to follow 
- To better support shadcn cli, we mimic similiar folder structure (components/libs/hooks), with nested level of folder grouping by use case / ecosystems .

   Meanwhile as we support fullstack flows and multiple ecosystems we need to handle more adaptesr and libraries dependenceis. 



## Minimize bundle size and Treeshaking 
- We strive to minmize [Dependencies][/design/dependencies]
- With "Copy & Paste" approach, we apply open-close principle and ensure dependencies are limited to required types and configs are loaded per usage scenario, 
- use naming conventions `.fixture.ts` `.test.ts` to avoid exporting related files at build 


## Shadcn

Dapp needs are quite different and end to end tested flows, not just UI components. Fork instead of adding these into the shadcdn registry.




### Supply chain Security
- Minimizing dependencies is discussed extensively.
- To avoid supply chain attacks, we should make versions easily fixed/immutable or configurable to native 

