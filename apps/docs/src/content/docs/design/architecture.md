---
title: Components Architecture
---


## Architecture

- We decoupled `@geist/domain` package for common, non-ecosystem specific logic and types.

- As we want to support shadcn cli, we mimic similiar folder structure (components/libs/hooks), with nested level of folder grouping by use case / ecosystems . Meanwhile as we support fullstack flows and multiple ecosystems we need to handle more adaptesr and libraries dependenceis. 
- As we have plans to support frameworks other than react in some usage, we do not consider wagmi a must and thus we plan to segregate framework specific into `ui-react`, `ui-solid` etc. 
- Note in monorepo, shadcn support specifying path to workspace with -c or --cwd option so we can install at storybook / react. We should ensure export path handled correctly

- We try to always decouple the presentation (dump) component from smart components. We support reasonable default but all data fetching / gateway etc should be explicit params at lower level components. 

- note only `default` style is supported for shadcn

## Minimize bundle size and Treeshaking 
- Refers to [/design/dependencies]
- With "Copy & Paste" approach, we apply open-close principle and ensure dependencies are limited to required types and configs are loaded per usage scenario, 
- use naming conventions `.fixture.ts` `.test.ts` to avoid exporting related files at build 

