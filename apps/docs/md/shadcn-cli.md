## Shadcn CLI support

we support using shadcn cli as-is to add geist components, in below fashion
- `shadcn add <geist-repo-url>/styles/default/identity_address-badge.json`
- Note we are still pointing default shadcn url (i.e. REGISTRY_URL) to original registry, so as to support adding components from both shadcn & geist registry


## Implementation details
- WIP, refesr to [#42](https://github.com/fractaldotbox/geist-dapp-kit/issues/42) for considerations


## Namespaces
- Originally Shadcn has no folder namespace at the registry, assuming unique naming across files under components / hooks / lib, which is hard for our scenario.

- We prefix geist lib and hooks explicitly for now

## Bulking
- Note shadcn registry entry contains source code for all related components/lib/hooks, which reduce http round trip.
- Meanwhile currently it requires explicitly specifiying dependencies at e.g. register-ui.tsx over analyzing imports of the component