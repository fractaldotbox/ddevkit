---
title: Contributing
---

Thanks for contributing! 

# Implementation Guideline

### Environment Setup
- At local, use https://book.getfoundry.sh/anvil/

### Repository structure
- Note this is a monorepo, we can specify which path [for shadcn to install components](https://ui.shadcn.com/docs/monorepo), i.e. into `ui-react` or `storybook`

### Convention

- use https://www.conventionalcommits.org/en/v1.0.0/

### changeset
- [Changesets](https://github.com/changesets/changesets) is used for release management at CI.
- Follows [semantic version](https://semver.org/)

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


