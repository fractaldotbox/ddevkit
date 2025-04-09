---
title: Installation
---


## Pre-requisite
- You can use `shadcn@canary` cli  to add components from dDevkit. 

- Install shadcn according to [your framework](https://ui.shadcn.com/docs/installation)

- For backend, for now you might copy utils manually to avoid installing tailwindcss and we will create dedicated cli


## Install component from geist

- dDevkit is deployed as a [custom registry of shadcn](https://ui.shadcn.com/docs/registry), on https://ddev.geist.network/ (IPFS) 

- You can look for components to use and identify the registry item url, then install via

- `pnpm exec shadcn@canary add https://ddev.geist.network/components/account/balance.json`
