---
title: Installation
---


## Pre-requisite
- You can use `shadcn@canary` cli  to add components from dDevkit. 

- Setup shadcn according to [your framework](https://ui.shadcn.com/docs/installation)



- dDevkit is deployed as a [custom registry of shadcn](https://ui.shadcn.com/docs/registry), on https://ddev.geist.network/ (IPFS) 

- You can look for components to use and identify the registry item url, then install via

- `pnpm exec shadcn@2.4.0 add https://ddev.geist.network/r/components/account/balance.json`

- We are going to launch a custom cli `ddev` which points default to above registry and can be used at backend & agent frameworks, so this will work soon

- `pnpm exec ddev add components/transactions/transaction-table`
