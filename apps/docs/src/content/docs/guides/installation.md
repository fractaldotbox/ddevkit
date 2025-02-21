---
title: Installation
---


## Pre-requisite
- You can use `shadcn@canary` cli  to add components from dDev kit. 

- Install shadcn according to [your framework](https://ui.shadcn.com/docs/installation)

- For backend, for now you might copy utils manually to avoid installing tailwindcss and we will create dedicated cli


## Install component from Geist dDev Kit Registry

- dDev kit is deployed as a [custom registry of shadcn](https://ui.shadcn.com/docs/registry), on https://ddev.geist.network/r (IPFS) 

- You can look for components to use and identify the registry item url, then install via

- `pnpm exec shadcn@canary add https://ddev.geist.network/r/components/account/balance.json`

- We are going to launch a custom cli `ddev` which points default to above registry and can be used at backend & agent frameworks, so this will work soon

- `pnpm exec ddev add components/transactions/transaction-table`