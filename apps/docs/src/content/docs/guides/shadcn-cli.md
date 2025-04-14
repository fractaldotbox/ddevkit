---
title: Cli
---


## Shadcn CLI support

We support using shadcn cli AS-IS to add geist components, which is deployed onto the [registry](https://ui.shadcn.com/docs/registry)


- `shadcn add <geist-repo-url>/styles/default/identity_address-badge.json`

- Note we are still pointing default shadcn url (i.e. REGISTRY_URL) to original registry, so as to support adding components from both shadcn & geist registry

- We currently do not support adding new components out of this repository to geist registry, but you can host your own registry


## Namespaces
- Originally Shadcn has no folder namespace at the registry, assuming unique naming across files under components / hooks / lib, which is hard for our scenario.

- We prefix geist lib and hooks explicitly for now

## Bulking
- Note shadcn registry entry contains source code for all related components/lib/hooks, which reduce http round trip.

- Meanwhile currently it requires explicitly specifiying dependencies at e.g. register-ui.tsx over analyzing imports of the component
