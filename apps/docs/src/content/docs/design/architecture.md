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
- With dceentralized agent, each agent has its own runtime and codebase. This means 



- We have decoupled `@geist/domain` package for common, non-ecosystem specific logic and types.





## Minimize bundle size and Treeshaking 
- We strive to minmize [Dependencies][/design/dependencies]
- With "Copy & Paste" approach, we apply open-close principle and ensure dependencies are limited to required types and configs are loaded per usage scenario, 
- use naming conventions `.fixture.ts` `.test.ts` to avoid exporting related files at build 

