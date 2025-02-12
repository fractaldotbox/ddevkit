---
title: Components Architecture
---


# Components Architecture

## Background
- Long-term design principles can be find on [/README.md]
- We're creating cookbook instead of libraries and we focus on  working, barebone, lightly styled components. It is way easier to identify painpoints and refactor for best architecture, instead of being astronaut architects. 

For now we try to mimic behaviours of common components e.g. blockscout, on-chain kit and we will revisit best UX for each component.


## Architecture

- We decoupled `@geist/domain` package for common, non-ecosystem specific logic and types.

- As we want to support shadcn cli, we mimic similiar folder structure (components/libs/hooks), with nested level of folder grouping by use case / ecosystems . Meanwhile as we support fullstack flows and multiple ecosystems we need to handle more adaptesr and libraries dependenceis. 
- As we have plans to support frameworks other than react in some usage, we do not consider wagmi a must and thus we plan to segregate framework specific into `ui-react`, `ui-solid` etc. 
- Note in monorepo, shadcn support specifying path to workspace with -c or --cwd option so we can install at storybook / react. We should ensure export path handled correctly

- We try to always decouple the presentation (dump) component from smart components. We support reasonable default but all data fetching / gateway etc should be explicit params at lower level components. 

- note only `default` style is supported for shadcn

## Minimize Code usage and Treeshaking 
- TBC
- With "Copy & Paste" approach, we apply open-close principle and ensure dependencies are limited to required types and configs are loaded per usage scenario, 
- We also prefer downstream dependencies that is treeshakable.
- Consider `lib/filecoin/gateway.ts` `getGatewayUrlWithCid()` as an example, it does not import dependenceis unconditionally or relevavnt ecosystem-specific code are expected to be injected using strategy pattern.
- use naming conventions `.fixture.ts` `.test.ts` to avoid exporting related files at build 


## Environment Setup
- At local, use https://book.getfoundry.sh/anvil/

## Convention

### Naming

Prefer shorter name for higher level components and use WithAbc to indicate Abc is required arguments


e.g. use <TokenChipWithInfo>for the lower level presentation only component, expect from customization

use <TokenChip address={0xabcde..} >  for the higher level component where data fetching is handled under the hood 


- components are named suncapitalized kebabcase to follow shadcn convention. ([Note it is not yet configurable](https://github.com/shadcn-ui/ui/pull/774))

## Environment Variables
- Always exepect env vars are provisionsed at process level (e.g. `env-cmd` `dotenvx run -- `, at local / docker etc ). Packages will never load directly from  filesystems with e.g. `dotenv` 
- always inject required values and avoid directly loading e.g. `process.env.API_KEY` at `ui-react`, and at top level read through config file (currently at `@geist/domain/config`) 


## Types
- TBC
- At zod, make use of brand https://github.com/colinhacks/zod?tab=readme-ov-file#brand

## Styling
- Try to be unopionated on styling as possible, and focus on functional customizable components
- For separation of concerns, use shadcn conventions as reasonable defaults. Customizable radix are encapsulated.
- Prefer tailwindcss

## Themes, dark mode


