# cli

Cli to add components / utils to your dapp or agents.


You can also use original `shadcn` cli to add UI components from geist registry.
Currently this cli is a shallow copy of the original cli to skip a few checks, rewrite paths and point default registry to ddev.geist.network
will rewrite for geist use case and integration with frameworks.

Refers [documentations](https://ddevkit.geist.network/guides/installation/) for details.

## Usage

Use the `init` command to initialize dependencies for a new project.


```bash
npx ddev init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx ddev add [component]
```

### Example

```bash
npx ddev add lib/wagmi-config
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx ddev add
```


# Development
- under `packages/ddev`, `pnpm link --global`
- at repo to execute command, `pnpm link @geist/ddev`
- run with `pnpm exec ddev`