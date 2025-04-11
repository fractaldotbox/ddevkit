## dDevKit

Optimized, headless components and utils that you can copy and paste into your dApps or Agent. 
Open Source. Open Code. AI-Ready. Accessible, Localized.

Inspired by [shadcn/ui](https://github.com/shadcn-ui). 

## [Documentations](https://ddevkit.geist.network/) | [Roadmap](https://github.com/orgs/fractaldotbox/projects/13) | [X @dDevKit](https://x.com/dDevKit)
> This is not a library. It is how you build your library.

⚠️ This is preview alpha version under active development

## For contributors
- Current approach is to focus on storybook, run `pnpm --filter storybook dev`
  - to identify key challenges and make sensible architecture decisions e.g. graphql
- end-goal is to make each of them copy-paste ready code
  - to be extraced into registry for shadcn cli work

## Design principles
- 🔻 Minimized dependencies, familiar techstack. No `ethers` by default, all in `viem` `wagmi` `permissionless` `radix` `tailwindcss`, user controls the rest.
- 🏎 Optimized and SSR ready. Unified data fetching with unopionated data source, minimized JS
- 🤌 Small. Faster for both user and ci. Cheaper to store. 
- 🔒 Secure. No dynamic script loading. Audited dependencies (TODO) 
- 🕊️ Censorship Resistant. Take explicit control on asset gateway and trust assumptions
- 🌐 Accessible & Localization ready
- ⛓️ Ecosystems, Framework agnostic
- 🙌 Working example. First class Storybook support, avoid outdated documentations. 
- 🚶 Open source. Authors can walkaway. No npm account breaking your code.



## Samlpe usage
- Check out [Hosted Storybook](https://ddev-storybook.geist.network/) for working examples 

Built by Team of [FractalBox](https://fractal.box/) and the community 


## Acknowledgement
- Thanks shadcn released with MIT license to make this 
- Thanks contributors and sponsors on [Gitcoin](https://explorer.gitcoin.co/#/projects/0x9dd138d22b68c074ec450b2560a00d89887058e886e433bb527fa6fce3f9b352) who funded this project.
