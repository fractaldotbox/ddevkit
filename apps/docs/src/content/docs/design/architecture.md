---
title: Components Architecture
---


## Architecture


### For dApps

- To better support shadcn cli, we mimic similiar folder structure (components/libs/hooks), with nested level of folder grouping by use case / ecosystems . Meanwhile as we support fullstack flows and multiple ecosystems we need to handle more adaptesr and libraries dependenceis. 
- As we have plans to (partially) support frameworks other than react, we do not consider wagmi a must and thus we plan to segregate framework specific into `ui-react`, `ui-solid` etc. 

- We try to always decouple the presentation (dump) component from smart components. We support reasonable default but all data fetching / gateway etc should be explicit params at lower level components. 

- note only `default` style is supported for shadcn

## For Agent
- With dceentralized agents, each agent has its own runtime and codebase. This means each could be using different versions of sdk to interact with protocol. Compared to single "official" dApp controlled by single team, we need much better dependencies management to cater for problems in diverse environment such as version conflicts. We should benefit from principles and effort of [UnixJs](https://unjs.io/) and [e18e](https://e18e.dev/) as in the wider javascript ecosystems to use small, perfomant packages.


- We have decoupled `@geist/domain` package for common, non-ecosystem specific logic and types.





## Minimize bundle size and Treeshaking 
- We strive to minmize [Dependencies][/design/dependencies]
- With "Copy & Paste" approach, we apply open-close principle and ensure dependencies are limited to required types and configs are loaded per usage scenario, 
- use naming conventions `.fixture.ts` `.test.ts` to avoid exporting related files at build 

